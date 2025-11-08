import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

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

  isLoggedIn: boolean = false;
  showPopover: boolean = false;
  popoverEvent: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (postId) {
      this.loadPost(postId);
      this.loadComments(postId);
    }
  }

  // ==============================
  // 📦 Cargar datos del post
  // ==============================
  loadPost(id: number) {
    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.votes[id] = this.votes[id] ?? null;
        this.voting[id] = false;
      },
      error: (err) => console.error('Error al cargar post:', err)
    });
  }

  // ==============================
  // 💬 Comentarios
  // ==============================
  loadComments(postId: number) {
    this.postService.getCommentsByPostId(postId).subscribe({
      next: (data) => {
        console.log('🟢 Comentarios cargados:', data);
        this.comments = data.map((c: any) => ({
          commentid: c.commentid,
          author: c.username || 'Anónimo',
          text: c.content,
          likes: c.likes ?? 0,
          dislikes: c.dislikes ?? 0
        }));
      },
      error: (err) => console.error('Error al cargar comentarios:', err)
    });
  }

  sendComment() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    const text = this.newComment.trim();
    if (!text || !this.post?.postid) return;

    this.postService.createComment(this.post.postid, text, token!).subscribe({
      next: (created) => {
        // agrega al final y limpia input
        this.comments.push(created);
        this.newComment = '';
        this.showComments = true;
      },
      error: (err) => {
        console.error('Error creando comentario:', err);
        if (!token) this.router.navigate(['/login']);
      }
    });
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendComment();
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }


  onVote(post: any, type: 'like' | 'dislike') {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.voting[post.postid] = true;

    this.postService.vote(post.postid, type, token).subscribe({
      next: (res: any) => {
        console.log(res.message);
        // Actualiza contadores directamente sin reordenar
        this.loadPost(post.postid);
        this.voting[post.postid] = false;
      },
      error: (err) => {
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
        // totals -> { likes, dislikes }
        c.likes = totals.likes;
        c.dislikes = totals.dislikes;
        this.commentVoting[c.commentid] = false;
      },
      error: (err) => {
        console.error('Error al votar comentario:', err);
        this.commentVoting[c.commentid] = false;
      }
    });
  }



  // Métodos conectados al HTML (para mantener nombres)
  like() {
    if (this.post) this.onVote(this.post, 'like');
  }

  dislike() {
    if (this.post) this.onVote(this.post, 'dislike');
  }

  ionViewWillEnter() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  // 🔹 Al hacer clic en "Perfil" / "Iniciar Sesión"
  onProfileButtonClick(event: Event) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.popoverEvent = event;
      this.showPopover = true;
    }
  }

  // 🔹 Ir al perfil
  goToProfileFromMenu() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.router.navigate(['/user-profile', user.id]);
    }
    this.showPopover = false; // cerrar menú
  }

  // 🔹 Cerrar sesión
  logout() {
    this.authService.clear();
    this.isLoggedIn = false;
    this.showPopover = false; // cerrar menú
    this.router.navigate(['/login']);
  }

  goToProfile() {
    const user = this.authService.getUser();

    if (user && user.id) {
      // ✅ Usuario logueado → ir a su perfil
      this.router.navigate(['/user-profile', user.id]);
    } else {
      // 🚪 No logueado → ir a login
      this.router.navigate(['/login']);
    }
  }
}
