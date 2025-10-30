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
      // más adelante podrías redirigir a su propia página
    }
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
