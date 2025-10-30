import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';

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

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
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

  likeComment(comment: any) {
    comment.likes++;
  }

  dislikeComment(comment: any) {
    comment.dislikes++;
  }
}
