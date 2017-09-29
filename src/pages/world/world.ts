import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CountrySelectionPage } from '../country-selection/country-selection';

import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-world',
  templateUrl: 'world.html'
})
export class WorldPage {

  constructor(
    public navCtrl: NavController, 
    public countrySrvc: CountryService) {
  }

  selectCountries(){
    this.navCtrl.push(CountrySelectionPage);
  }

}
