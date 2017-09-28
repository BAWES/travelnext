import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public countrySrvc: CountryService) {
  }

}
