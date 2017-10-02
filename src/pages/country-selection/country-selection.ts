import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

// Services
import { CountryService } from '../../providers/country.service'
import { UserService } from '../../providers/user.service'

@Component({
  selector: 'page-country-selection',
  templateUrl: 'country-selection.html'
})
export class CountrySelectionPage {

  public pageTitle;

  public countriesByRegion;

  // Only allow save when data is fully loaded
  public allowSave = true;

  constructor(
    public navCtrl: NavController, 
    private _viewCtrl: ViewController,
    public userSrvc: UserService,
    public countrySrvc: CountryService,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    params: NavParams
  ) {
    this.pageTitle = `I've been to`;
    this.countriesByRegion = this.countrySrvc.countriesByRegion;
  }

  /**
   * Rebuild user country selection db for overwrite
   */
  save(){
    let loading = this.loadingCtrl.create({
      content: 'Saving'
    });
    loading.present();

    // final object to upload
    let newRegionDataForUser = {};

    this.countrySrvc.countriesByRegion.forEach(region => {
      // data for this region to upload
      let regionCountrySelection = {
        name: region.name,
        countries: {},
        numCountriesSelected: 0,
        totalCountriesInRegion: region.totalCountries
      };

      // If region has countries, loop through and check
      if(region.countries){
        region.countries.forEach(country => {
          // If country is selected, append to the selection
          if(this.userSrvc.selectedCountriesFormModel[country.$key] === true){
            regionCountrySelection.countries[country.$key] = JSON.parse(JSON.stringify(country));
            regionCountrySelection.numCountriesSelected++;

            // Delete key from object to avoid duplicates
            delete regionCountrySelection.countries[country.$key]["$key"];
          }
        });
      }

      // Assign this regions new data
      newRegionDataForUser[region.name] = regionCountrySelection;
    });

    // Publish update to server
    this.userSrvc.updateCountrySelection(newRegionDataForUser).then(() => {
      loading.dismiss();
      this.close();
    });
  }

  /**
   * Close the page
   */
  close(){
    this._viewCtrl.dismiss();
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
