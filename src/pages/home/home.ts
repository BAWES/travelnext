import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { CountryPage } from '../country/country';
import { CountrySelectionPage } from '../country-selection/country-selection';

import { AuthService } from '../../providers/auth.service';
import { UserService } from '../../providers/user.service';
import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public userSrvc: UserService,
    public countrySrvc: CountryService,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  selectCountries(){
    this.navCtrl.push(CountrySelectionPage);
  }

  loadCountry(country){
    this.navCtrl.push(CountryPage, {
      country: country
    });
  }

  attemptLogout(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Logout',
          role: 'destructive',
          handler: () => {
            this.auth.logout();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

}
