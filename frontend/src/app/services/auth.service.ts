import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

// validar usuarios y manejar sesiones mediante localStorage

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'app_token';

  constructor(private http: HttpClient) {}

  // Guarda el token en localStorage
  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtiene el token guardado
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Elimina el token (logout)
  clear() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded; // contiene id y role
    } catch (err) {
      console.error('Error decodificando token', err);
      return null;
    }
  }
}
