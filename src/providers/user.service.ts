import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth.service';

/*
  Handles all User functions
*/
@Injectable()
export class UserService {
    public numCountriesVisited = 0;
    public numCountriesTotal = 0;

    // Selected countries for display on home page
    public selectedCountriesByRegion = [];
    // Selected countries data for use on update of user selection
    public selectedCountriesFormModel = [];

    // Subscription to unsubscribe on logout
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

    updateCountrySelection(selectionData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._db.object(`/user-country-selection/${this._auth.uid}`)
                .set(selectionData)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    /**
     * Keep country list by region updated.
     */
    initAllSelectedCountriesByRegion() {
        this.liveUserSubscription = this._db.list(`/user-country-selection/${this._auth.uid}`).snapshotChanges().subscribe((regions) => {
            this.selectedCountriesByRegion = [];
            this.numCountriesTotal = 0;
            this.numCountriesVisited = 0;
            regions.forEach(region => {
                // Make countries iterable
                let regionData : any = region.payload.val();
                if (regionData.countries) {
                    let countryList = [];
                    Object.keys(regionData.countries).forEach(countryKey => {
                        let country = regionData.countries[countryKey];
                        country.$key = countryKey;
                        countryList.push(country);

                        // Append to form data model for user input.
                        this.selectedCountriesFormModel[country.$key] = true;
                    });
                    regionData.countries = countryList;
                }
                this.selectedCountriesByRegion.push(regionData);

                // Append to num countries
                if(regionData.numCountriesSelected && regionData.totalCountriesInRegion){
                    this.numCountriesTotal += regionData.totalCountriesInRegion;
                    this.numCountriesVisited += regionData.numCountriesSelected;
                }
                
            });
        });
    }

}
