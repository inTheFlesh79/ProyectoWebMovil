import { Component, OnInit } from '@angular/core';
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

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.cargarPosts();
  }

  cargarPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = [...data]; // copia directa, asegura render
        console.log('Publicaciones cargadas:', this.filteredPosts);
      },
      error: (err) => {
        console.error('Error al obtener publicaciones:', err);
        this.filteredPosts = []; // evita que quede null
      }
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
}
