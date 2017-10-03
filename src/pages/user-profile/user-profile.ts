import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { CountryPage } from '../country/country';
import { CountrySelectionPage } from '../country-selection/country-selection';

import { AuthService } from '../../providers/auth.service';
import { UserService } from '../../providers/user.service';
import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  public userData: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public auth: AuthService,
    public userSrvc: UserService,
    public countrySrvc: CountryService,
    params: NavParams
  ) {
    let userSelected = params.get("user");

    // this.db.object
  }

  selectCountries(){
    this.navCtrl.push(CountrySelectionPage);
  }

  loadCountry(country){
    this.navCtrl.push(CountryPage, {
      country: country
    });
  }

}
