import { Component } from '@angular/core';
import { Platform, NavController, ActionSheetController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

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
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    private _socialSharing: SocialSharing
  ) {
  }

  share(){
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      subject: 'the subject', // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.website.com/foo/#bar?a=b',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    };
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
