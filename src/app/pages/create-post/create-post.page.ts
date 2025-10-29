import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: false
})
export class CreatePostPage {
  title: string = '';
  content: string = '';

  readonly TITLE_MAX = 120;
  readonly CONTENT_MAX = 2000;

  constructor(private router: Router,
    private postService: PostService,
    private authService: AuthService,
    private alertCtrl: AlertController) {}

  // Lógica para habilitar el botón de publicar
  canPublish(): boolean {
    const t = this.title?.trim();
    const c = this.content?.trim();
    return !!t && !!c && t.length <= this.TITLE_MAX && c.length <= this.CONTENT_MAX;
  }

  async publish() {
    if (!this.canPublish()) return;

    const token = this.authService.getToken();
    if (!token) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Debes iniciar sesión para publicar.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.postService.createPost(this.title.trim(), this.content.trim(), token).subscribe({
      next: async () => {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'Tu publicación se ha creado correctamente.',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/community']);
      },
      error: async (err) => {
        console.error('Error creando post:', err);
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo crear la publicación. Intenta de nuevo.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  // Cancelar y limpiar lo trabajado
  cancel() {
    this.title = '';
    this.content = '';
    this.router.navigate(['/community']);
  }

  // ayuda para mostrar contador
  get titleRemaining() {
    return this.TITLE_MAX - (this.title?.length || 0);
  }

  get contentRemaining() {
    return this.CONTENT_MAX - (this.content?.length || 0);
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
