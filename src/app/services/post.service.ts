import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';
  private commentUrl = 'http://localhost:3000/api/comments';
  private voteUrl = 'http://localhost:3000/api/votes';

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todos los posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔹 Obtener un post por ID
  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Obtener comentarios del post
  getCommentsByPostId(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.commentUrl}/post/${postId}`);
  }

  // 🔹 Crear un nuevo comentario
  createComment(comment: any): Observable<any> {
    return this.http.post<any>(this.commentUrl, comment);
  }

  vote(postid: number, vote_type: 'like' | 'dislike', token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.voteUrl, { postid, vote_type }, { headers });
  }
}
