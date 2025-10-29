import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  correo: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  goBack() {
    this.navCtrl.back();
  }

  async buttonTrigger() {
    if (!this.correo || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const response: any = await this.http
        .post('http://localhost:3000/api/auth/login', {
          correo: this.correo,
          password: this.password
        })
        .toPromise();

      this.authService.setToken(response.token);
      console.log('Usuario autenticado:', response.user);

      // Redirige a otra página, por ejemplo la comunidad
      this.navCtrl.navigateRoot('/community');
    } catch (err: any) {
      console.error(err);
      this.errorMessage = err.error?.error || 'Error al iniciar sesión.';
    } finally {
      this.loading = false;
    }
  }
}
