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

  isLoggedIn: boolean = false;
  showPopover: boolean = false;
  popoverEvent: any;
  
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

  ionViewWillEnter() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  // 🔹 Al hacer clic en "Perfil" / "Iniciar Sesión"
  onProfileButtonClick(event: Event) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.popoverEvent = event;
      this.showPopover = true;
    }
  }

  // 🔹 Ir al perfil
  goToProfileFromMenu() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.router.navigate(['/user-profile', user.id]);
    }
    this.showPopover = false; // cerrar menú
  }

  // 🔹 Cerrar sesión
  logout() {
    this.authService.clear();
    this.isLoggedIn = false;
    this.showPopover = false; // cerrar menú
    this.router.navigate(['/login']);
  }
}
