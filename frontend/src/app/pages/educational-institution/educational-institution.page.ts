import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationalInstitutionService } from '../../services/educational-institution.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-educational-institution',
  templateUrl: './educational-institution.page.html',
  styleUrls: ['./educational-institution.page.scss'],
  standalone: false
})
export class EducationalInstitutionPage implements OnInit {
  institution: any = null;
  professors: any[] = [];

  isLoggedIn: boolean = false;
  showPopover: boolean = false;
  popoverEvent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private institutionService: EducationalInstitutionService
  ) {}

  ngOnInit() {
    const eduid = this.route.snapshot.paramMap.get('id');
    if (eduid) {
      console.log('Cargando institución con ID:', eduid);
      this.loadInstitution(Number(eduid));
    }
  }

  loadInstitution(id: number) {
    this.institutionService.getInstitutionById(id).subscribe({
      next: (data) => {
        this.institution = data;
        console.log('Institución cargada:', data);
      },
      error: (err) => console.error('Error al cargar institución:', err)
    });

    this.institutionService.getProfessorsByInstitution(id).subscribe({
      next: (data) => {
        this.professors = data;
        console.log('Profesores cargados:', data);
      },
      error: (err) => console.error('Error al cargar profesores:', err)
    });
  }

  goToTeacherPage(prof: any) {
    const id = prof?.teacherpageid ?? prof?.teacherPageId;
    if (id) {
      this.router.navigate(['/teacher-page', id]);
    } else {
      console.warn('Profesor sin teacherPageId:', prof);
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
