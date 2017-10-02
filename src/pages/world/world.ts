import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CountryPage } from '../country/country';

import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-world',
  templateUrl: 'world.html'
})
export class WorldPage {

  public countriesByRegion;

  constructor(
    public navCtrl: NavController, 
    public countrySrvc: CountryService
  ) {
      this.countriesByRegion = this.countrySrvc.countriesByRegion.slice(0);
  }

  loadCountry(country){
    this.navCtrl.push(CountryPage, {
      country: country
    });
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
        let newRegionData = JSON.parse(JSON.stringify(region));
        newRegionData.countries = filteredCountries;
        this.countriesByRegion.push(newRegionData);
      }
    });
  }

}
