import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public auth: AuthService) {

  }

  loginWithGoogle(){
    this.auth.loginWithGoogle();
  }

  loginWithFacebook(){
    this.auth.loginWithFacebook();
  }

}
