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
    if(!this.platform.is("cordova")) return;
    
    let progressCompleted = Math.ceil((this.userSrvc.numCountriesVisited / this.countrySrvc.worldCountryCount) * 100);
    var options = {
      message: `I've visited ${progressCompleted}% of all countries in the world. #TravelNextApp @TravelNextApp`, // not supported on some apps (Facebook, Instagram)
      subject: 'My trips around the world on TravelNext App', // fi. for email
      url: 'http://onelink.to/f6acjt',
    };
    this._socialSharing.shareWithOptions(options);
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
