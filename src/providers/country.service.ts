import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

/*
  Handles all User functions
*/
@Injectable()
export class CountryService {

    public countriesByRegion = [];

    constructor(
        private _db: AngularFireDatabase,
    ) {
        this.initAllCountriesByRegion();
    }

    /**
     * Keep country list by region updated.
     */
    initAllCountriesByRegion() {
        this._db.list("/regions").subscribe((regions) => {
            this.countriesByRegion = [];
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
                this.countriesByRegion.push(region);
            });
        });
    }

}
