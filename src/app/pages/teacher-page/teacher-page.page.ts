import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherReviewService } from 'src/app/services/teacher-review.service';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.page.html',
  styleUrls: ['./teacher-page.page.scss'],
  standalone: false
})
export class TeacherPage implements OnInit {
  teacher: any = null;
  ratings: any = null;
  reviews: any[] = [];
  reviewVoting: Record<number, boolean> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacherReviewService: TeacherReviewService,
    private teacherService: TeacherService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const teacherId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Cargando profesor con ID:', teacherId);

    this.loadTeacherData(teacherId);
  }

  loadTeacherData(id: number) {
    // 1️⃣ Cargar datos del profesor
    this.teacherService.getTeacherPageById(id).subscribe({
      next: (data) => {
        console.log('Profesor cargado:', data);
        this.teacher = data;
      },
      error: (err) => console.error('Error al obtener profesor:', err)
    });

    // 2️⃣ Cargar promedios de rating
    this.teacherService.getTeacherAverage(id).subscribe({
      next: (avg) => {
        console.log('Promedios cargados:', avg);
        this.ratings = {
          teaching: Number(avg.avg_quality) || 0,
          student: Number(avg.avg_politeness) || 0,
          difficulty: Number(avg.avg_difficulty) || 0
        };
      },
      error: (err) => console.error('Error al obtener promedio:', err)
    });

    this.teacherService.getTeacherReviews(id).subscribe((reviewsData) => {
      console.log('Reseñas cargadas:', reviewsData);
      this.reviews = reviewsData;

      // 🔽 Obtener todas las calificaciones
      this.teacherService.getAllTeacherRatings().subscribe((ratingsData) => {
        console.log('Ratings cargados:', ratingsData);

        // Asignar promedio de cada usuario a su reseña correspondiente
        this.reviews.forEach((review) => {
          const userRatings = ratingsData.filter(
            (r: any) => Number(r.userid) === Number(review.userid)
          );

          if (userRatings.length > 0) {
            const r = userRatings[0]; // cada usuario debería tener 1 rating por profesor
            const avg = (r.teachingpoliteness + r.teachingquality + r.teachingdifficulty) / 3;
            review.rating = avg.toFixed(1); // redondear a un decimal
          } else {
            review.rating = null;
          }
        });
      });
    });

  }

  goToReview() {
    const user = this.authService.getUser(); // o el método que uses para obtener el usuario logueado
    const teacherId = this.teacher?.teacherpageid; // ajusta según cómo tengas la data

    if (!teacherId) return;

    if (!user) {
      // No está logueado → redirigir a login
      this.router.navigate(['/login']);
    } else {
      // Logueado → ir a pantalla de calificación
      this.router.navigate(['/teacher-review', teacherId]);
    }
  }

  onReviewVote(review: any, type: 'like' | 'dislike') {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const id = Number(review.reviewid || review.id);
    if (!id) return;

    if (this.reviewVoting[id]) return;
    this.reviewVoting[id] = true;

    // Optimista (local)
    const prevLikes = review.likes || 0;
    const prevDislikes = review.dislikes || 0;

    // Si quieres toggling con memoria local necesitarías conocer si el usuario ya votó; para simplificar:
    if (type === 'like') review.likes = (review.likes || 0) + 1;
    if (type === 'dislike') review.dislikes = (review.dislikes || 0) + 1;

    const rollback = () => {
      review.likes = prevLikes;
      review.dislikes = prevDislikes;
      this.reviewVoting[id] = false;
    };

    this.teacherReviewService.voteReview(id, type, token).subscribe({
      next: (totals) => {
        // sincroniza con DB
        review.likes = totals.likes;
        review.dislikes = totals.dislikes;
        this.reviewVoting[id] = false;
      },
      error: (err) => {
        console.error('Error votando review:', err);
        rollback();
      }
    });
  }
}
