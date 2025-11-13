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

  // 🔹 Campos del popover de “Agregar Profesor”
  addTeacherPopoverOpen: boolean = false;
  newTeacherName: string = '';
  newTeacherDescription: string = '';

  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router
  ) {}

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
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  // 🔹 Verifica si el usuario puede agregar profesores
  canAddTeacher(): boolean {
    const user = this.authService.getUser();
    return user && user.role === 1;
  }

  // 🔹 Abrir popover “Agregar Profesor”
  openAddTeacherPopover() {
    this.addTeacherPopoverOpen = true;
  }

  // 🔹 Cerrar popover
  closeAddTeacherPopover() {
    this.addTeacherPopoverOpen = false;
    this.newTeacherName = '';
    this.newTeacherDescription = '';
  }

  // 🔹 Placeholder sin lógica backend
  addTeacher() {
    console.log('Nuevo profesor:', {
      nombre: this.newTeacherName,
      descripcion: this.newTeacherDescription
    });
    this.closeAddTeacherPopover();
  }

  goToProfile() {
    const user = this.authService.getUser();
    if (user && user.id) this.router.navigate(['/user-profile', user.id]);
    else this.router.navigate(['/login']);
  }

  ionViewWillEnter() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onProfileButtonClick(event: Event) {
    if (!this.isLoggedIn) this.router.navigate(['/login']);
    else {
      this.popoverEvent = event;
      this.showPopover = true;
    }
  }

  goToProfileFromMenu() {
    const user = this.authService.getUser();
    if (user && user.id) this.router.navigate(['/user-profile', user.id]);
    this.showPopover = false;
  }

  logout() {
    this.authService.clear();
    this.isLoggedIn = false;
    this.showPopover = false;
    this.router.navigate(['/login']);
  }
}
