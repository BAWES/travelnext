import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CountryPage } from '../country/country';

import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  public friendList;

  constructor(
    public navCtrl: NavController, 
    public countrySrvc: CountryService
  ) {
  }

  loadUserPage(country){
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
      this.friendList = this.countrySrvc.countriesByRegion;
      return;
    }

    this.friendList = [];
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
        this.friendList.push(newRegionData);
      }
    });
  }

}
