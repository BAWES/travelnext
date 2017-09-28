import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

// Services
import { CountryService } from '../../providers/country.service'

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

    console.log(this.selectedCountries);

    // final object to upload
    let newUserSelection = {};

    this.countrySrvc.countriesByRegion.forEach(region => {
      // data for this region to upload
      let regionCountrySelection = {

      };
      region.forEach(country => {

      });
    });

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
