import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth.service';

/*
  Handles all User functions
*/
@Injectable()
export class UserService {

  public selectedCountriesByRegion = [];

  public liveUserSubscription;

  constructor(
    private _db: AngularFireDatabase,
    private _auth: AuthService,
    private _events: Events
    ) { 
      this.initAllSelectedCountriesByRegion();
      this._events.subscribe('user:logout', (userEventData) => {
        this.liveUserSubscription.unsubscribe();
      });
    }

    updateCountrySelection(selectionData){
      this._db.object(`/users/${this._auth.uid}/country-selection`).set(selectionData);
    }

    /**
     * Keep country list by region updated.
     */
    initAllSelectedCountriesByRegion() {
        this.liveUserSubscription = this._db.list(`/users/${this._auth.uid}/country-selection`).subscribe((regions) => {
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

}
