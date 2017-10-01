import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CountrySelectionPage } from '../country-selection/country-selection';

import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-country',
  templateUrl: 'country.html'
})
export class CountryPage {

  public countriesByRegion;

  constructor(
    public navCtrl: NavController, 
    public countrySrvc: CountryService
  ) {
      this.countriesByRegion = this.countrySrvc.countriesByRegion.slice(0);
  }

  /**
   * Search for country that matches user input
   * @param  
   */
  search($event){
    let userInput = $event.target.value;

    if(!userInput){
      this.countriesByRegion = this.countrySrvc.countriesByRegion;
      return;
    }

    this.countriesByRegion = [];
    this.countrySrvc.countriesByRegion.forEach(region => {
      let filteredCountries = region.countries.filter(country => {
        if((country.name.common.toLowerCase().indexOf(userInput.toLowerCase()) !== -1)){
          return true;
        }
        return false;
      });
      // If there are results from filtered countries, push them to the list
      if(filteredCountries.length){
        let newCountryData = JSON.parse(JSON.stringify(filteredCountries));
        let newRegionData = JSON.parse(JSON.stringify(region));
        newRegionData.countries = filteredCountries;
        this.countriesByRegion.push(newRegionData);
      }
    });
  }

}