import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

/*
  Handles all User functions
*/
@Injectable()
export class UserService {

  constructor(
    private _db: AngularFireDatabase,
    ) { 
    }

    /**
     * Update across all nodes where it exists
     * @param {any} key
     * @param {any} data
     */
    update(key, data){
        // return this._getNodesWhereCountryExists(key).then(vendorNodes => {
        //     // Loop through the object to create specific nodes to update data 
        //     // Multi-level updates are treated as "set" which is desctructive if path is not specific.
        //     var updateData = {};
        //     for (var objKey in data) {
        //         updateData[`/categories/${key}/${objKey}`] = data[objKey];
        //         updateData[`/categoriesWithVendors/${key}/${objKey}`] = data[objKey];

        //         // Update within /vendors node
        //         vendorNodes.forEach(vendor => {
        //             updateData[`/vendors/${vendor.$key}/categories/${key}/${objKey}`] = data[objKey];
        //         });
        //     }

        //     return this._db.object('/').update(updateData);
        // });
    }

    /**
     * Delete across all nodes where it exists
     * @param {any} key
     */
    delete(key){
        this._getNodesWhereCountryExists(key).then(vendorNodes => {

            // Main Data
            var deleteData = {
                [`/categories/${key}`]: null,
                [`/categoriesWithVendors/${key}`]: null
            };

            // Update within /vendors node
            vendorNodes.forEach(vendor => {
                deleteData[`/vendors/${vendor.$key}/categories/${key}`] = null;
            });

            return this._db.object('/').update(deleteData);
        });
    }

    /**
     * Add specified vendor within category 
     * Also create record of category within that vendor.
     * @param {any} vendor
     * @param {any} category
     */
    addVendorToCategory(vendor, category){
        return this._db.object('/').update({
            [`/categoriesWithVendors/${category.$key}/vendors/${vendor.$key}`]: vendor,
            [`/vendors/${vendor.$key}/categories/${category.$key}`]: category
        });
    }

    /**
     * Remove specified vendor from category 
     * Also remove record of category within that vendor.
     * @param {any} vendor
     * @param {any} category
     */
    removeVendorFromCategory(vendor, category){
        return this._db.object('/').update({
            [`/categoriesWithVendors/${category.$key}/vendors/${vendor.$key}`]: null,
            [`/vendors/${vendor.$key}/categories/${category.$key}`]: null
        });
    }

    /**
     * Return array of nodes where this Category exists within vendor
     */
    private _getNodesWhereCountryExists(key): Promise<any>{
        return new Promise((resolve, reject) => {
            this._db.list(`/categoriesWithVendors/${key}/vendors`).take(1).subscribe(vendors => {
                resolve(vendors);
            });
        });
    }
}
