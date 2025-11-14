// src/app/services/location.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private API_URL = 'http://localhost:3000/api/dpa';

  constructor(private http: HttpClient) {}

  // Obtener regiones
  getRegiones() {
    return this.http.get<any[]>(`${this.API_URL}/regiones`).pipe(
      catchError(err => {
        console.error('Error cargando regiones:', err);
        return of([]);
      })
    );
  }

  // Obtener comunas por región
  getComunasPorRegion(regionCodigo: string) {
    return this.http.get<any[]>(`${this.API_URL}/regiones/${regionCodigo}/comunas`).pipe(
      catchError(err => {
        console.error('Error cargando comunas:', err);
        return of([]);
      })
    );
  }
}
