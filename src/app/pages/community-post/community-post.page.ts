import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-community-post',
  templateUrl: './community-post.page.html',
  styleUrls: ['./community-post.page.scss'],
  standalone: false
})
export class CommunityPostPage implements OnInit {
  post: any = null;
  comments: any[] = [];
  newComment: string = '';
  showComments = false;

  // Estado de votación
  voting: Record<number, boolean> = {};
  commentVoting: Record<number, boolean> = {};
  votes: Record<number, 'like' | 'dislike' | null> = {};

  // Header & popover
  isLoggedIn = false;
  showPopover = false;
  popoverEvent: any;

  // Popover de post
  postPopoverOpen = false;
  postPopoverEvent: any;
  selectedPost: any;
  readonly TITLE_MAX = 120;
  readonly CONTENT_MAX = 2000;
  isEditModalOpen = false;
  editedPost: any = {};

  // Popover de comentario
  commentPopoverOpen = false;
  commentPopoverEvent: any;
  selectedComment: any;

  // API base
  private apiUrl = 'http://localhost:3000/api/posts';
  private commentUrl = 'http://localhost:3000/api/comments';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (postId) {
      this.loadPost(postId);
      this.loadComments(postId);
    }
  }

  // Cargar datos
  loadPost(id: number) {
    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.votes[id] = this.votes[id] ?? null;
        this.voting[id] = false;
      },
      error: (err: any) => console.error('Error al cargar post:', err)
    });
  }

  loadComments(postId: number) {
    this.postService.getCommentsByPostId(postId).subscribe({
      next: (data) => {
        this.comments = data.map((c: any) => ({
          commentid: c.commentid,
          userid: c.userid,
          author: c.username || 'Anónimo',
          text: c.content,
          likes: c.likes ?? 0,
          dislikes: c.dislikes ?? 0
        }));
      },
      error: (err: any) => console.error('Error al cargar comentarios:', err)
    });
  }

  // Comentarios
  sendComment() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const text = this.newComment.trim();
    if (!text || !this.post?.postid) return;

    this.postService.createComment(this.post.postid, text, token).subscribe({
      next: () => {
        this.newComment = '';
        this.showComments = true;
        window.location.reload();
      },
      error: (err: any) => {
        console.error('Error creando comentario:', err);
        if (!token) this.router.navigate(['/login']);
      }
    });
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter') this.sendComment();
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  // Votaciones
  onVote(post: any, type: 'like' | 'dislike') {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.voting[post.postid] = true;

    this.postService.vote(post.postid, type, token).subscribe({
      next: () => {
        this.loadPost(post.postid);
        this.voting[post.postid] = false;
      },
      error: (err: any) => {
        console.error('Error al votar:', err);
        this.voting[post.postid] = false;
      }
    });
  }

  onVoteComment(c: any, type: 'like' | 'dislike') {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.commentVoting[c.commentid] = true;
    this.postService.voteComment(Number(c.commentid), type, token).subscribe({
      next: (totals) => {
        c.likes = totals.likes;
        c.dislikes = totals.dislikes;
        this.commentVoting[c.commentid] = false;
      },
      error: (err: any) => {
        console.error('Error al votar comentario:', err);
        this.commentVoting[c.commentid] = false;
      }
    });
  }

  // Header popover
  ionViewWillEnter() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onProfileButtonClick(event: Event) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.popoverEvent = event;
      this.showPopover = true;
    }
  }

  goToProfileFromMenu() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.router.navigate(['/user-profile', user.id]);
    }
    this.showPopover = false;
  }

  logout() {
    this.authService.clear();
    this.isLoggedIn = false;
    this.showPopover = false;
    this.router.navigate(['/login']);
  }

  // Popover de post
  openPostPopover(event: Event, post: any) {
    event.stopPropagation?.();
    this.selectedPost = post;
    this.postPopoverEvent = event;
    this.postPopoverOpen = true;
  }

  canModify(post: any): boolean {
    const currentUser = this.authService.getUser();
    if (!currentUser) return false;
    const isAdmin = currentUser.role === 1;
    const isOwner = currentUser.id === post.userid;
    return isAdmin || isOwner;
  }

  async deletePost(post: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar publicación',
      message: '¿Seguro que deseas eliminar esta publicación?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.confirmDelete(post)
        }
      ]
    });

    await alert.present();
  }

  private confirmDelete(post: any) {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.delete(`${this.apiUrl}/${post.postid}`, { headers }).subscribe({
      next: () => {
        console.log(`Post ${post.postid} eliminado con éxito.`);
        this.postPopoverOpen = false;
        setTimeout(() => {
          this.router.navigate(['/community']).then(() => window.location.reload());
        }, 300);
      },
      error: (err) => {
        console.error('Error eliminando publicación:', err);
        this.postPopoverOpen = false;
      }
    });
  }

  // Popover de comentarios
  openCommentPopover(event: Event, comment: any) {
    event.stopPropagation?.();
    this.selectedComment = comment;
    this.commentPopoverEvent = event;
    this.commentPopoverOpen = true;
  }

  canModifyComment(comment: any): boolean {
    const currentUser = this.authService.getUser();
    if (!currentUser) return false;

    const isAdmin = currentUser.role === 1;
    const isOwner = currentUser.id === comment.userid;

    return isAdmin || isOwner;
  }

  async deleteComment(comment: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar comentario',
      message: '¿Seguro que deseas eliminar este comentario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.confirmDeleteComment(comment)
        }
      ]
    });

    await alert.present();
  }

  private confirmDeleteComment(comment: any) {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.delete(`${this.commentUrl}/${comment.commentid}`, { headers }).subscribe({
      next: () => {
        console.log(`Comentario ${comment.commentid} eliminado correctamente.`);
        // Remueve el comentario de la lista en el front
        this.comments = this.comments.filter(c => c.commentid !== comment.commentid);
        this.commentPopoverOpen = false;
        setTimeout(() => {
          window.location.reload();
        }, 300);
      },
      error: (err) => {
        console.error('Error eliminando comentario:', err);
        this.commentPopoverOpen = false;
      }
    });

  }

  // Abrir modal de edición
  openEditModal(post: any) {
    this.selectedPost = post;
    this.editedPost = { ...post }; // Clon del post a editar
    this.isEditModalOpen = true;
    this.postPopoverOpen = false; // Cierra el menú contextual
  }

  // Cerrar modal de edición
  closeEditModal() {
    this.isEditModalOpen = false;
    this.editedPost = {};
  }

  // Guardar cambios del post
  saveEdit() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const t = this.editedPost.title?.trim() || '';
    const c = this.editedPost.content?.trim() || '';

    // Validación de límites y vacío
    if (!t || !c || t.length > this.TITLE_MAX || c.length > this.CONTENT_MAX) {
      console.warn('Los campos no cumplen con los requisitos de longitud.');
      return;
    }
    
    // enviar la solicitud PUT
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.patch(`${this.apiUrl}/${this.editedPost.postid}`, 
      { title: t, content: c }, { headers }
    ).subscribe({
      next: () => {
        this.isEditModalOpen = false;
        window.location.reload();
      },
      error: (err) => console.error("Error al actualizar post:", err)
    });

  }

}
