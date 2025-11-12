import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: false
})
export class CommunityPage implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchTerm = '';
  votes: Record<number, 'like' | 'dislike' | null> = {};
  voting: Record<number, boolean> = {};

  isLoggedIn = false;
  showPopover = false;
  popoverEvent: any;

  postPopoverOpen = false;
  postPopoverEvent: any;
  selectedPost: any = null;
  currentUser: any = null;

  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cargarPosts();
    this.actualizarEstadoLogin();
    this.currentUser = this.authService.getUser();
  }

  ionViewWillEnter() {
    this.actualizarEstadoLogin();
  }

  actualizarEstadoLogin() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  cargarPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = data.sort((a, b) => b.postid - a.postid);
        for (const p of this.posts) {
          this.votes[p.postid] = this.votes[p.postid] ?? null;
          this.voting[p.postid] = false;
        }
      },
      error: (err) => console.error(err)
    });
  }

  buscarPublicaciones() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPosts =
      term.trim() === ''
        ? this.posts
        : this.posts.filter((post) =>
            post.title.toLowerCase().includes(term)
          );
  }

  onVote(post: any, type: 'like' | 'dislike') {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.voting[post.postid] = true;
    this.postService.vote(post.postid, type, token).subscribe({
      next: () => {
        this.cargarPosts();
        this.voting[post.postid] = false;
      },
      error: (err) => {
        console.error('Error al votar:', err);
        this.voting[post.postid] = false;
      }
    });
  }

  openPost(postId: number) {
    this.router.navigate(['/community-post', postId]);
  }

  goToUserProfile(id: number) {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/user-profile', id]);
  }

  goToCreatePost() {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/create-post']);
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

  goToProfile() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.router.navigate(['/user-profile', user.id]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // 🔹 Verifica si el usuario puede modificar un post
  canModify(post: any): boolean {
    const currentUser = this.authService.getUser();
    if (!currentUser) return false;

    const isAdmin = currentUser.role === 1;
    const isOwner = currentUser.id === post.userid;

    return isAdmin || isOwner;
  }
  
  // 🔹 Abre el popover contextual del post
  openPostPopover(event: Event, post: any) {
    this.selectedPost = post;
    this.postPopoverEvent = event;
    this.postPopoverOpen = true;
  }

  // 🔹 Eliminar publicación (con confirmación moderna)
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

  // 🔹 Confirmar eliminación (realiza la petición HTTP DELETE)
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
          window.location.reload();
        }, 300);
      },
      error: (err) => {
        console.error('Error eliminando publicación:', err);
        this.postPopoverOpen = false;
      }
    });
  }


}
