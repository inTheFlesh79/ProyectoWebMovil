import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener datos del profesor
  getTeacherPageById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/teacherPage/${id}`);
  }

  // Obtener promedio de ratings del profesor
  getTeacherAverage(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/teacherRating/teacher/${id}/average`);
  }

  // Obtener reseñas del profesor
  getTeacherReviews(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews/teacher/${id}`);
  }

  // Obtener todas las calificaciones
  getAllTeacherRatings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teacherRating`);
  }

}
