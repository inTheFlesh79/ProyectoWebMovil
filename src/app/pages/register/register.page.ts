import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  correo: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  rut: string = '';
  region: string = '';
  district: string = '';
  telefono: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  goBack() {
    this.navCtrl.back();
  }

  async registerUser() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const response: any = await this.http
        .post('http://localhost:3000/api/auth/register', {
          username: this.username,
          correo: this.correo,
          password: this.password,
          rut: this.rut,
          region: this.region,
          district: this.district,
          isMember: true,
          role: 0
        })
        .toPromise();

      this.authService.setToken(response.token);
      console.log('Usuario registrado:', response.user);

      this.navCtrl.navigateRoot('/community');
    } catch (err: any) {
      console.error('❌ Error completo al registrar:', err);

      if (err.error) {
        console.log('➡️ Respuesta del backend:', err.error);
      }

      this.errorMessage = err.error?.error || 'Error al registrar usuario.';
    } finally {
      this.loading = false;
    }
  }
}
