import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { CountryPage } from '../country/country';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  public user;
  public selectedCountriesByRegion = [];

  public isLoading = true;
  public userCountrySubscription;

  public actionText = "Follow";

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public auth: AuthService,
    params: NavParams
  ) {
    this.user = params.get("user");
  }

  ionViewWillEnter(){
    this.loadUserCountrySelection(this.user.$key);
  }

  ionViewWillLeave(){
    this.userCountrySubscription.unsubscribe();
  }

  loadUserCountrySelection(userKey) {
    this.userCountrySubscription = this.db.list(`/user-country-selection/${userKey}`).subscribe((regions) => {
      this.isLoading = false;
      this.selectedCountriesByRegion = [];
      regions.forEach(region => {
        // Make countries iterable
        if (region.countries) {
          let countryList = [];
          Object.keys(region.countries).forEach(countryKey => {
            let country = region.countries[countryKey];
            country.$key = countryKey;
            countryList.push(country);
          });
          region.countries = countryList;
        }
        this.selectedCountriesByRegion.push(region);
      });
    });
  }

  loadCountry(country) {
    this.navCtrl.push(CountryPage, {
      country: country
    });
  }

}
