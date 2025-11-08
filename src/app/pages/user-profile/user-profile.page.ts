import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: false
})
export class UserProfilePage implements OnInit {

  user: any = {};
  comments: any[] = [];
  opinions: any[] = [];

  // 🔹 Control de paginación
  itemsPerPage = 6;

  currentPageComments = 1;
  currentPageOpinions = 1;

  isLoggedIn: boolean = false;
  showPopover: boolean = false;
  popoverEvent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.loadUserProfile(userId);
    } else {
      console.error('No se recibió el ID de usuario en la URL');
    }
  }

  loadUserProfile(id: number) {
    this.userService.getUserProfile(id).subscribe({
      next: (data) => {
        this.user = {
          photo: data.user.profilepicture
            ? 'data:image/jpeg;base64,' + data.user.profilepicture
            : 'assets/default-profile.png',
          name: data.user.username,
          role: data.user.role
        };
        this.comments = data.comments || [];
        this.opinions = data.reviews || [];
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
      }
    });
  }

  // 🔹 Métodos de paginación para comentarios
  get paginatedComments() {
    const start = (this.currentPageComments - 1) * this.itemsPerPage;
    return this.comments.slice(start, start + this.itemsPerPage);
  }

  get totalPagesComments() {
    return Math.ceil(this.comments.length / this.itemsPerPage) || 1;
  }

  changeCommentsPage(page: number) {
    if (page >= 1 && page <= this.totalPagesComments) {
      this.currentPageComments = page;
    }
  }

  // 🔹 Métodos de paginación para opiniones
  get paginatedOpinions() {
    const start = (this.currentPageOpinions - 1) * this.itemsPerPage;
    return this.opinions.slice(start, start + this.itemsPerPage);
  }

  get totalPagesOpinions() {
    return Math.ceil(this.opinions.length / this.itemsPerPage) || 1;
  }

  changeOpinionsPage(page: number) {
    if (page >= 1 && page <= this.totalPagesOpinions) {
      this.currentPageOpinions = page;
    }
  }

  // 🔹 Otros métodos existentes
  getRoleText(role: number): string {
    return role === 1 ? 'Administrador' : 'Miembro';
  }

  goToPost(postId: number) {
    this.router.navigate(['/community-post', postId]);
  }

  goToProfile() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.router.navigate(['/user-profile', user.id]);
    } else {
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
