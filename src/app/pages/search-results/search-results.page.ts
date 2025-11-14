import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
  standalone: false
})
export class SearchResultsPage implements OnInit {
  results: any = null;

  isLoggedIn: boolean = false;
  showPopover: boolean = false;
  popoverEvent: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.results = navigation?.extras?.state?.['results'] || null;

    console.log('Resultados recibidos:', this.results);
  }

  openResult(item: any) {
    if (item.teacherpageid) {
      this.router.navigate(['/teacher-page', item.teacherpageid]);
    } else if (item.eduid) {
      console.log('Institución clickeada:', item.eduname);
      this.router.navigate(['/educational-institution', item.eduid]);
    }
  }

  goToProfile() {
    const user = this.authService.getUser();

    if (user && user.id) {
      // Usuario logueado → ir a su perfil
      this.router.navigate(['/user-profile', user.id]);
    } else {
      // No logueado → ir a login
      this.router.navigate(['/login']);
    }
  }

  ionViewWillEnter() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  // Al hacer clic en "Perfil" / "Iniciar Sesión"
  onProfileButtonClick(event: Event) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.popoverEvent = event;
      this.showPopover = true;
    }
  }

  // Ir al perfil
  goToProfileFromMenu() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.router.navigate(['/user-profile', user.id]);
    }
    this.showPopover = false; // cerrar menú
  }

  // Cerrar sesión
  logout() {
    this.authService.clear();
    this.isLoggedIn = false;
    this.showPopover = false; // cerrar menú
    this.router.navigate(['/login']);
  }

}
