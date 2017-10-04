import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { CountryPage } from '../country/country';

import { AuthService } from '../../providers/auth.service';
import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  public user;
  public selectedCountriesByRegion = [];

  public followStatusObject: any;
  public isFollowing = false;

  public isLoading = true;
  public isLoadingFollowStatus = true;
  public userCountrySubscription;
  public followStatusSubscription;
  
  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public auth: AuthService,
    public countrySrvc: CountryService,
    params: NavParams
  ) {
    this.user = params.get("user");
  }

  ionViewWillEnter(){
    this.loadUserCountrySelection(this.user.$key);
    this.loadFollowStatus();
  }

  ionViewWillLeave(){
    this.userCountrySubscription.unsubscribe();
    this.followStatusSubscription.unsubscribe();
  }

  follow(){
    if(this.isFollowing) return;
    this.followStatusObject.set(true);
  }

  unfollow(){
    if(!this.isFollowing) return;
    this.followStatusObject.remove();
  }

  loadFollowStatus(){
    this.followStatusObject = this.db.object(`/user-following/${this.auth.uid}/${this.user.$key}`);
    this.followStatusSubscription = this.followStatusObject.snapshotChanges().subscribe((result) => {
      this.isFollowing = result.payload.exists();
      this.isLoadingFollowStatus = false;
    });
  }

  loadUserCountrySelection(userKey) {
    this.userCountrySubscription = this.db.list(`/user-country-selection/${userKey}`).snapshotChanges().subscribe((regions) => {
      this.isLoading = false;
      this.selectedCountriesByRegion = [];
      regions.forEach(region => {
        // Make countries iterable
        let regionData = region.payload.val();
        if (regionData.countries) {
          let countryList = [];
          Object.keys(regionData.countries).forEach(countryKey => {
            let country = regionData.countries[countryKey];
            country.$key = countryKey;
            countryList.push(country);
          });
          regionData.countries = countryList;
        }
        this.selectedCountriesByRegion.push(regionData);
      });
    });
  }

  loadCountry(country) {
    this.navCtrl.push(CountryPage, {
      country: country
    });
  }

}
