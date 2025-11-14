import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// uso de HttpClient para realizar solicitudes HTTP

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:3000/api/search';

  constructor(private http: HttpClient) {}

  buscar(query: string): Observable<any> {
    console.log('Buscando en API:', query);
    return this.http.get(`${this.apiUrl}?query=${query}`);
  }
}
