import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CountrySelectionPage } from '../country-selection/country-selection';

@Component({
  selector: 'page-country',
  templateUrl: 'country.html'
})
export class CountryPage {

  public country;

  constructor(
    public navCtrl: NavController,
    params: NavParams 
  ) {
      this.country = params.get("country");
      console.log(this.country);
  }

}
