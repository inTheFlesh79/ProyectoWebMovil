import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: false
})
export class CommunityPage implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchTerm: string = '';
  votes: Record<number, 'like' | 'dislike' | null> = {};
  voting: Record<number, boolean> = {};

  isLoggedIn: boolean = false;
  showPopover: boolean = false;
  popoverEvent: any;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarPosts();
    this.actualizarEstadoLogin();
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

  // 🔹 Click en botón Perfil / Iniciar Sesión
  onProfileButtonClick(event: Event) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.popoverEvent = event;
      this.showPopover = true;
    }
  }

  // 🔹 Ir al perfil desde menú
  goToProfileFromMenu() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.router.navigate(['/user-profile', user.id]);
    }
    this.showPopover = false; // ✅ se cierra
  }

  // 🔹 Cerrar sesión desde menú
  logout() {
    this.authService.clear();
    this.isLoggedIn = false;
    this.showPopover = false; // ✅ se cierra
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
}
