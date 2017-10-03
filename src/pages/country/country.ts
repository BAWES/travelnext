import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

      if(this.country && this.country.languages){
        this.country.languages = this._convertEnumerable(this.country.languages);
      }
  }

  // Make an object enumerable
  private _convertEnumerable(objectArray){
    let enumerable = [];
    Object.keys(objectArray).forEach(objectKey => {
      enumerable.push(objectArray[objectKey]);
    });
    return enumerable;
  }

}
