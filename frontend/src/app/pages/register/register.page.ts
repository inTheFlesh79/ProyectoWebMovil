import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  correo = '';
  username = '';
  password = '';
  confirmPassword = '';
  rut = '';
  region = '';
  district = '';
  telefono = '';
  errorMessage = '';
  loading = false;

  regiones: any[] = [];
  comunas: any[] = [];

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private authService: AuthService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.cargarRegiones();
  }

  cargarRegiones() {
    this.locationService.getRegiones().subscribe({
      next: (data) => {
        console.log('Regiones cargadas:', data);
        this.regiones = data;
      },
      error: (err) => console.error('Error al cargar regiones:', err)
    });
  }

  onRegionChange(event: any) {
    const regionCodigo = event.detail.value;

    this.region = regionCodigo; 
    this.comunas = []; 
    this.district = ''; 

    this.locationService.getComunasPorRegion(regionCodigo).subscribe({
      next: (data) => {
        this.comunas = data;
      },
      error: (err) => console.error('Error al cargar comunas:', err)
    });
  }

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
          telefono: this.telefono,
          isMember: true,
          role: 0
        })
        .toPromise();

      this.authService.setToken(response.token);
      this.navCtrl.navigateRoot('/community');
    } catch (err: any) {
      console.error('Error completo al registrar:', err);
      this.errorMessage = err.error?.error || 'Error al registrar usuario.';
    } finally {
      this.loading = false;
    }
  }
}