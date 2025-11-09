import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherReviewService } from 'src/app/services/teacher-review.service';
import { forkJoin } from 'rxjs';

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

  isLoggedIn: boolean = false;
  showPopover: boolean = false;
  popoverEvent: any;

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
    // 1) Datos del profesor
    this.teacherService.getTeacherPageById(id).subscribe({
      next: (data) => { this.teacher = data; },
      error: (err) => console.error('Error al obtener profesor:', err)
    });

    // 2) Promedio general del profesor
    this.teacherService.getTeacherAverage(id).subscribe({
      next: (avg) => {
        this.ratings = {
          teaching: Number(avg?.avg_quality) || 0,
          student:  Number(avg?.avg_politeness) || 0,
          difficulty: Number(avg?.avg_difficulty) || 0
        };
      },
      error: (err) => console.error('Error al obtener promedio:', err)
    });

    // 3) Reviews + ratings de ESTE profesor → se cruzan por userid
    forkJoin({
      reviews: this.teacherService.getTeacherReviews(id),
      ratings: this.teacherService.getRatingsByTeacher(id)
    }).subscribe({
      next: ({ reviews, ratings }) => {
        // Mapa rápido por userid
        const ratingsByUser: Record<number, { teachingpoliteness: number; teachingquality: number; teachingdifficulty: number; }> = {};

        (ratings || []).forEach((r: any) => {
          const uid = Number(r.userid);
          ratingsByUser[uid] = {
            teachingpoliteness: Number(r.teachingpoliteness) || 0,
            teachingquality:    Number(r.teachingquality)    || 0,
            teachingdifficulty: Number(r.teachingdifficulty) || 0
          };
        });

        // Adjuntar promedio a cada review del mismo usuario
        this.reviews = (reviews || []).map((rev: any) => {
          const uid = Number(rev.userid);
          const ur = ratingsByUser[uid];

          if (ur) {
            const sum = ur.teachingpoliteness + ur.teachingquality + ur.teachingdifficulty;
            const avg = sum / 3;
            return { ...rev, rating: Math.round(avg * 10) / 10 };
          }
          return { ...rev, rating: null };
        });
      },
      error: (err) => {
        console.error('Error cargando reviews/ratings del profesor:', err);
        this.reviews = [];
      }
    });
  }

  goToReview() {
    const user = this.authService.getUser();
    const teacherId = this.teacher?.teacherpageid;

    if (!teacherId) return;

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    // Verificar si ya tiene review
    this.teacherReviewService.checkUserReview(teacherId, Number(user.userid ?? user.id)).subscribe({
      next: (resp) => {
        if (resp.exists) {
          // Mostrar alerta con dos botones
          this.showExistingReviewAlert(teacherId);
        } else {
          // No tiene review -> navegar directo
          this.router.navigate(['/teacher-review', teacherId]);
        }
      },
      error: (err) => {
        console.error('Error verificando review existente:', err);
        // fallback: dejar navegar
        this.router.navigate(['/teacher-review', teacherId]);
      }
    });
  }

  // ALERTA con "Continuar" (izq) y "Eliminar y calificar" (der)
  async showExistingReviewAlert(teacherId: number) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Calificación existente';
    alert.message = 'Ya has calificado a este profesor previamente. Debes eliminar la calificacion anterior antes de poder calificar de nuevo a este profesor.';

    alert.buttons = [
      {
        text: 'Cancelar',        // izquierda
        role: 'cancel'
      },
      {
        text: 'Eliminar y calificar',  // derecha
        handler: async () => {
          await this.deleteAndGoToReview(teacherId);
        }
      }
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  // Eliminar feedback del usuario y redirigir a /teacher-review/:id
  async deleteAndGoToReview(teacherId: number) {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.teacherReviewService.deleteUserFeedback(teacherId, token).subscribe({
      next: () => {
        // OK -> ir a calificar
        this.router.navigate(['/teacher-review', teacherId]);
      },
      error: (err) => {
        console.error('Error al eliminar calificación/reseña:', err);
        // Si falla, al menos no bloquear al usuario; puedes mostrar toast si quieres.
      }
    });
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
