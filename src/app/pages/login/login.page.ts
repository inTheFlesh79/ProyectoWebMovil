import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})

export class LoginPage {

  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();  // returns to the previous page in history
  }

  buttonTrigger() {
    // your login logic
  }
}

