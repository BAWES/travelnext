import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CountrySelectionPage } from '../country-selection/country-selection';

import { UserService } from '../../providers/user.service';
import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public userSrvc: UserService,
    public countrySrvc: CountryService
  ) {
  }

  selectCountries(){
    this.navCtrl.push(CountrySelectionPage);
  }

}
