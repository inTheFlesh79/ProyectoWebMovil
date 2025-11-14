import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// uso de HttpClient para realizar solicitudes HTTP

@Injectable({
  providedIn: 'root'
})
export class EducationalInstitutionService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener datos de una institución por su ID
  getInstitutionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/educationalInstitution/${id}`);
  }

  // Obtener profesores asociados a una institución
  getProfessorsByInstitution(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/educationalInstitution/${id}/teachers`);
  }

}
