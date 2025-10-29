import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  searchQuery: string = '';

  constructor(private searchService: SearchService, private authService: AuthService, private router: Router) {}

  onSearch() {
    if (!this.searchQuery.trim()) return;

    this.searchService.buscar(this.searchQuery).subscribe({
      next: (data) => {
        this.router.navigate(['/search-results'], { state: { results: data } });
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
      }
    });
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter') { this.onSearch(); }
  }

  goToProfile() {
    const user = this.authService.getUser();

    if (user && user.id) {
      // ✅ Usuario logueado → ir a su perfil
      this.router.navigate(['/user-profile', user.id]);
    } else {
      // 🚪 No logueado → ir a login
      this.router.navigate(['/login']);
    }
  }
}
