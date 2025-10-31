import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeacherReviewService } from 'src/app/services/teacher-review.service';
import { AuthService } from 'src/app/services/auth.service'; // si tienes auth

@Component({
  selector: 'app-teacher-review',
  templateUrl: './teacher-review.page.html',
  styleUrls: ['./teacher-review.page.scss'],
  standalone: false
})
export class TeacherReviewPage implements OnInit {
  teacherPageId!: number;
  userId!: number;

  teaching: string = '';
  studentRespect: string = '';
  difficulty: string = '';
  review: string = '';

  teachingTouched = false;
  studentRespectTouched = false;
  difficultyTouched = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private teacherReviewService: TeacherReviewService,
    private authService: AuthService // si manejas sesión
  ) {}

  ngOnInit() {
    // Obtener ID del profesor desde la ruta
    this.teacherPageId = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener usuario actual
    const user = this.authService.getUser(); // o el método que uses
    this.userId = user?.userid ?? 1; // valor temporal si no tienes auth
  }

  onRatingInput(event: any, field: string) {
    const raw = (event.target as HTMLInputElement).value || '';
    let sanitized = raw.replace(/[^1-7]/g, '').slice(0, 1);
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

  async onPublish() {
    this.teachingTouched = this.studentRespectTouched = this.difficultyTouched = true;
    if (!this.isFormValid()) return;

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
      date: new Date().toISOString().slice(0, 10),
      likes: 0,
      dislikes: 0
    };

    try {
      await this.teacherReviewService.createRating(ratingData).toPromise();
      await this.teacherReviewService.createReview(reviewData).toPromise();

      console.log('Review y rating publicados correctamente');
      this.router.navigate(['/teacher-page', this.teacherPageId]);
    } catch (err) {
      console.error('Error publicando reseña:', err);
    }
  }

  onCancel() {
    this.location.back();
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
