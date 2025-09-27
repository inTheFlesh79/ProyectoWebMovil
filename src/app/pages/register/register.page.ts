import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back(); // navigates back to the previous page
  }
}

