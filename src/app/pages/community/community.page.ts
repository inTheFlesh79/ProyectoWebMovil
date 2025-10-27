import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

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

  constructor(private postService: PostService, private router: Router) {}
  

  ngOnInit() {
    this.cargarPosts();
  }

  cargarPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = [...data];
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

  onLike(post: any) {
    if (this.voting[post.postid]) return;
    this.voting[post.postid] = true;

    const prev = this.votes[post.postid]; // null | 'like' | 'dislike'
    let action: 'like'|'switch-like';

    if (prev === 'like') {
      // Ya tiene like: no hacemos nada (o podrías implementar "quitar like")
      this.voting[post.postid] = false;
      return;
    } else if (prev === 'dislike') {
      // Cambia de dislike -> like
      action = 'switch-like';
      post.dislikes = Math.max(0, post.dislikes - 1);
      post.likes += 1;
    } else {
      // Sin voto previo
      action = 'like';
      post.likes += 1;
    }

    const rollback = () => {
      // revertimos los cambios locales
      if (action === 'like') post.likes = Math.max(0, post.likes - 1);
      if (action === 'switch-like') { post.likes = Math.max(0, post.likes - 1); post.dislikes += 1; }
      this.voting[post.postid] = false;
    };

    this.postService.votePost(post.postid, action).subscribe({
      next: (updated) => {
        // sincroniza con DB por si hay desfase
        post.likes = updated.likes;
        post.dislikes = updated.dislikes;
        this.votes[post.postid] = 'like';
        this.voting[post.postid] = false;
      },
      error: (err) => {
        console.error('Error votando like:', err);
        rollback();
      }
    });
  }

  onDislike(post: any) {
    if (this.voting[post.postid]) return;
    this.voting[post.postid] = true;

    const prev = this.votes[post.postid];
    let action: 'dislike'|'switch-dislike';

    if (prev === 'dislike') {
      this.voting[post.postid] = false;
      return;
    } else if (prev === 'like') {
      action = 'switch-dislike';
      post.likes = Math.max(0, post.likes - 1);
      post.dislikes += 1;
    } else {
      action = 'dislike';
      post.dislikes += 1;
    }

    const rollback = () => {
      if (action === 'dislike') post.dislikes = Math.max(0, post.dislikes - 1);
      if (action === 'switch-dislike') { post.dislikes = Math.max(0, post.dislikes - 1); post.likes += 1; }
      this.voting[post.postid] = false;
    };

    this.postService.votePost(post.postid, action).subscribe({
      next: (updated) => {
        post.likes = updated.likes;
        post.dislikes = updated.dislikes;
        this.votes[post.postid] = 'dislike';
        this.voting[post.postid] = false;
      },
      error: (err) => {
        console.error('Error votando dislike:', err);
        rollback();
      }
    });
  }

  openPost(postId: number) {
    this.router.navigate(['/community-post', postId]);
  }

}
