import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

/*
  Handles all User functions
*/
@Injectable()
export class CountryService {
    public worldCountryCount = 0;

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
        this._db.list("/regions").snapshotChanges().subscribe((regions) => {
            this.countriesByRegion = [];
            regions.forEach(region => {
                // Make countries iterable
                let regionData = region.payload.val();
                if (regionData.countries) {
                    let countryList = [];
                    Object.keys(regionData.countries).forEach(countryKey => {
                        let country = regionData.countries[countryKey];
                        country.$key = countryKey;
                        countryList.push(country);

                        this.worldCountryCount++;
                    });
                    regionData.countries = countryList;
                }
                this.countriesByRegion.push(regionData);
            });
        });
    }

}
