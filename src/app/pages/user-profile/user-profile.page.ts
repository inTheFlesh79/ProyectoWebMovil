import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

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

  itemsPerPage = 6;
  currentPageComments = 1;
  currentPageOpinions = 1;

  isLoggedIn: boolean = false;
  showPopover: boolean = false;
  popoverEvent: any;

  // Popover menú usuario (3 puntos)
  userPopoverOpen: boolean = false;
  userPopoverEvent: any;

  // Control permisos
  canModify: boolean = false;
  loggedUser: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) this.loadUserProfile(userId);

    this.loggedUser = this.authService.getUser();
    this.canModify = this.loggedUser?.role === 1; // Solo admins
  }

  loadUserProfile(id: number) {
    this.userService.getUserProfile(id).subscribe({
      next: (data) => {
        this.user = {
          id: id,
          photo: data.user.profilepicture
            ? 'data:image/jpeg;base64,' + data.user.profilepicture
            : 'assets/default-profile.png',
          name: data.user.username,
          role: data.user.role
        };
        this.comments = data.comments || [];
        this.opinions = data.reviews || [];
      },
      error: (err) => console.error('Error cargando perfil:', err)
    });
  }

  get paginatedComments() {
    const start = (this.currentPageComments - 1) * this.itemsPerPage;
    return this.comments.slice(start, start + this.itemsPerPage);
  }

  get totalPagesComments() {
    return Math.ceil(this.comments.length / this.itemsPerPage) || 1;
  }

  changeCommentsPage(page: number) {
    if (page >= 1 && page <= this.totalPagesComments) this.currentPageComments = page;
  }

  get paginatedOpinions() {
    const start = (this.currentPageOpinions - 1) * this.itemsPerPage;
    return this.opinions.slice(start, start + this.itemsPerPage);
  }

  get totalPagesOpinions() {
    return Math.ceil(this.opinions.length / this.itemsPerPage) || 1;
  }

  changeOpinionsPage(page: number) {
    if (page >= 1 && page <= this.totalPagesOpinions) this.currentPageOpinions = page;
  }

  getRoleText(role: number): string {
    return role === 1 ? 'Administrador' : 'Miembro';
  }

  goToPost(postId: number) {
    this.router.navigate(['/community-post', postId]);
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

  // 🔹 Menú de 3 puntos
  openUserPopover(event: Event) {
    this.userPopoverEvent = event;
    this.userPopoverOpen = true;
  }

  // 🔹 Confirmación visual con restricciones
  async deleteUser() {
    if (!this.canModify) return;

    // Si el admin intenta borrarse a sí mismo o a otro admin
    if (this.loggedUser.id === this.user.id || this.user.role === 1) {
      const alert = await this.alertController.create({
        header: 'Acción no permitida',
        message: 'No puedes eliminar tu propio perfil ni el de otro administrador.',
        buttons: [{ text: 'Cancelar', role: 'cancel' }]
      });
      await alert.present();
      return;
    }

    // Confirmación normal
    const alert = await this.alertController.create({
      header: 'Eliminar usuario',
      message: '¿Seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.confirmDeleteUser()
        }
      ]
    });

    await alert.present();
  }

  confirmDeleteUser() {
    this.userService.deleteUser(this.user.id).subscribe({
      next: async () => {
        this.userPopoverOpen = false;

        const alert = await this.alertController.create({
          header: 'Usuario eliminado',
          message: 'El usuario ha sido eliminado correctamente.',
          buttons: ['OK']
        });

        await alert.present();

        // Redirigir a lista de usuarios o home
        this.router.navigate(['/home']);
      },
      error: async (err) => {
        console.error('Error eliminando usuario:', err);

        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo eliminar el usuario.',
          buttons: ['OK']
        });

        await alert.present();
      }
    });
  }
}
