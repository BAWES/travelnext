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

  public selectedCountries = [];

  // Only allow save when data is fully loaded
  public allowSave = false;

  constructor(
    public navCtrl: NavController, 
    private _viewCtrl: ViewController,
    private _userService: UserService,
    public countrySrvc: CountryService,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    params: NavParams
  ) {
    
    this.pageTitle = `I've been to`;

    // Mark categories that have already been assigned as checked.
    this._markAlreadyAssigned();
  }

  /**
   * Mark vendor's already selected subcategories as already assigned.
   */
  private _markAlreadyAssigned(){
    // Mark vendors selected subcategories as assigned
    // Object.keys(this.vendor.subcategories).forEach(countryKey => {
    //   this.selectedCountries[countryKey] = true;
    // });

    this.allowSave = true;
  }

  /**
   * Rebuild user country selection db for overwrite
   */
  save(){
    let loading = this.loadingCtrl.create({
      content: 'Saving'
    });

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
          if(this.selectedCountries[country.$key] === true){
            regionCountrySelection.countries[country.$key] = country;
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
    this._userService.updateCountrySelection(newRegionDataForUser);

    loading.dismiss();
    this.close();
  }

  /**
   * Close the page
   */
  close(){
    this._viewCtrl.dismiss();
  }

}
