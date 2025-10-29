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
  votes: Record<number, 'like'|'dislike'|null> = {};
  voting: Record<number, boolean> = {}; // para evitar doble click rápido

  constructor(private postService: PostService, private authService: AuthService, private router: Router) {}
  

  ngOnInit() {
    this.cargarPosts();
  }

  cargarPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = data.sort((a, b) => b.postid - a.postid);
        // Inicializamos estado local
        for (const p of this.posts) {
          this.votes[p.postid] = this.votes[p.postid] ?? null;
          this.voting[p.postid] = false;
        }
      },
      error: (err) => console.error(err)
    });
  }

  // 🔎 Método para filtrar las publicaciones por título
  buscarPublicaciones() {
    const term = this.searchTerm.toLowerCase();

    if (term.trim() === '') {
      // Si no se ha escrito nada, muestra todo
      this.filteredPosts = this.posts;
    } else {
      // Si hay término, filtra los resultados
      this.filteredPosts = this.posts.filter((post) =>
        post.title.toLowerCase().includes(term)
      );
    }
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
        this.cargarPosts(); // recargar para mostrar likes/dislikes actualizados
        this.voting[post.postid] = false;
      },
      error: err => {
        console.error('Error al votar:', err);
        this.voting[post.postid] = false;
      }
    });
  }


  openPost(postId: number) {
    this.router.navigate(['/community-post', postId]);
  }

  goToUserProfile(id: number) {
    this.router.navigate(['/user-profile', id]);
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
