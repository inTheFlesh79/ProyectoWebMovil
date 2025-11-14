import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeacherReviewService } from 'src/app/services/teacher-review.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-teacher-review',
  templateUrl: './teacher-review.page.html',
  styleUrls: ['./teacher-review.page.scss'],
  standalone: false
})
export class TeacherReviewPage implements OnInit {

  teacherPageId!: number;
  userId!: number;
  username!: string;

  teaching: string = '';
  studentRespect: string = '';
  difficulty: string = '';
  review: string = '';

  teachingTouched = false;
  studentRespectTouched = false;
  difficultyTouched = false;

  isLoggedIn: boolean = false;
  showPopover: boolean = false;
  popoverEvent: any;

  isSubmitting: boolean = false; // para deshabilitar botón mientras se envía

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private teacherReviewService: TeacherReviewService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // obtener id del profesor desde la ruta
    this.teacherPageId = Number(this.route.snapshot.paramMap.get('id'));

    // obtener usuario desde auth
    const user = this.authService.getUser();

    if (!user || !user.id) {
      // no hay sesión: redirigir a login
      console.warn('⚠️ No hay sesión activa → redirigiendo a login.');
      this.router.navigate(['/login']);
      return;
    }

    this.userId = user.id;
    this.username = user.username ?? (user.name || '');
    console.log('👤 Usuario:', this.username, '(ID:', this.userId, ')');
  }

  ionViewWillEnter() {
    // actualizar flag de sesión cada vez que entra la vista
    this.isLoggedIn = this.authService.isLoggedIn ? this.authService.isLoggedIn() : !!this.authService.getUser();
  }

  // Restricción solo valores 1 a 7
  onRatingInput(event: any, field: string) {
    const raw = (event.target as HTMLInputElement).value || '';
    const sanitized = raw.replace(/[^1-7]/g, '').slice(0, 1);
    (this as any)[field] = sanitized;
    (this as any)[`${field}Touched`] = true;
  }

  onReviewInput(event: any) {
    const val = event?.detail?.value ?? event.target.value ?? '';
    this.review = val.length > 500 ? val.slice(0, 500) : val;
  }

  isValid(value: string): boolean {
    return /^[1-7]$/.test(value);
  }

  isFormValid(): boolean {
    return (
      this.isValid(this.teaching) &&
      this.isValid(this.studentRespect) &&
      this.isValid(this.difficulty)
    );
  }

  /** PUBLICAR rating + review */
  async onPublish() {
    this.teachingTouched = this.studentRespectTouched = this.difficultyTouched = true;
    if (!this.isFormValid()) return;

    if (this.isSubmitting) return; // evitar envío doble
    this.isSubmitting = true;

    const ratingData = {
      teachingPoliteness: Number(this.studentRespect),
      teachingQuality: Number(this.teaching),
      teachingDifficulty: Number(this.difficulty),
      userid: this.userId,
      teacherPageId: this.teacherPageId
    };

    const reviewData = {
      content: this.review,
      userid: this.userId,
      teacherPageId: this.teacherPageId,
      username: this.username, // enviar nombre
      date: new Date().toISOString().slice(0, 10),
      likes: 0,
      dislikes: 0
    };

    try {
      // Crear rating
      await this.teacherReviewService.createRating(ratingData).toPromise();

      // Crear review
      await this.teacherReviewService.createReview(reviewData).toPromise();

      console.log('Review y rating publicados correctamente');

      // Navegar a la página del profesor y recargar para que aparezca la nueva reseña
      this.router.navigate(['/teacher-page', this.teacherPageId]).then(() => {
        window.location.reload();
      });

    } catch (err: any) {
      // manejo básico de errores
      console.error('Error publicando reseña:', err);

      // Si el backend devuelve 400 con mensaje de duplicado, mostrar en consola
      if (err?.status === 400) {
        console.warn('No se puede crear: ya existe una review/rating para este usuario y profesor.');
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel() {
    this.location.back();
  }

  onProfileButtonClick(event: Event) {
    // Si NO está logueado ir a login
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    // Si está logueado abrir popover/menu contextual
    this.popoverEvent = event;
    this.showPopover = true;
  }

  goToProfileFromMenu() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.router.navigate(['/user-profile', user.id]);
    } else {
      this.router.navigate(['/login']);
    }
    this.showPopover = false;
  }

  logout() {
    // limpia sesión
    if (this.authService.clear) {
      this.authService.clear();
    } else {
      // borrar localStorage manualmente
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.isLoggedIn = false;
    this.showPopover = false;
    // redirigir a login
    this.router.navigate(['/login']);
  }

  goToProfile() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.router.navigate(['/user-profile', user.id]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}