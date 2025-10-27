import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';
  private commentUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todos los posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔹 Obtener un post por ID
  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Votar (único voto permitido)
  votePost(id: number, type: 'like' | 'dislike' | 'switch-like' | 'switch-dislike'): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/vote`, { type });
  }

  // 🔹 Obtener comentarios del post
  getCommentsByPostId(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.commentUrl}/post/${postId}`);
  }

  // 🔹 Crear un nuevo comentario
  createComment(comment: any): Observable<any> {
    return this.http.post<any>(this.commentUrl, comment);
  }
}
