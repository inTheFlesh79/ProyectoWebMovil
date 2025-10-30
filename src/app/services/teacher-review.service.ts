import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherReviewService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Crear calificación (TeacherRating)
  createRating(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/teacherRating`, data);
  }

  // Crear reseña (Review)
  createReview(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, data);
  }

  voteReview(reviewid: number, vote_type: 'like' | 'dislike', token: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<any>(`${this.apiUrl}/review-votes`, { reviewid, vote_type }, { headers });
    }
}
