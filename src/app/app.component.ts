import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private inactivityTimer: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Inicia el control al cargar la app
    this.resetInactivityTimer();
  }

  // 🖱️ Detecta movimiento del mouse o pulsaciones de teclado
  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);

    // Configura el tiempo de inactividad (2 minutos)
    this.inactivityTimer = setTimeout(() => {
      if (this.authService.isLoggedIn()) {
        console.log('⏳ Sesión cerrada por inactividad');
        this.authService.clear();
        this.router.navigate(['/login']);
      }
    }, 10 * 60 * 1000); // 2 minutos (en milisegundos)
  }
}
