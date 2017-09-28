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

  public allCountries = [];
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

    // Get all "Parent" categories this vendor is assigned to
    // this.db.list(`/vendors/${this.vendor.$key}/categories`).take(1).subscribe(vendorCategories => {
    //   vendorCategories.forEach((vendorCategory, index) => {
    //     this.allowedVendorCategoriesAndSubcategories[index] = {
    //       categoryTitle: vendorCategory.categoryTitleEn,
    //       subcategories: []
    //     };
    //     // Get list of ALL subcategories belonging to this category and append to array
    //     this.db.list(`/categoriesWithVendors/${vendorCategory.$key}/subcategories`).take(1).subscribe(subcategories => {
    //       subcategories.forEach(subcategory => {
    //         this.allowedVendorCategoriesAndSubcategories[index].subcategories.push(subcategory);
    //       });
    //     });
    //   });
    // });

    // Mark categories that have already been assigned as checked.
    this._markAlreadyAssigned();
  }

  /**
   * Mark vendor's already selected subcategories as already assigned.
   */
  private _markAlreadyAssigned(){
    // Mark vendors selected subcategories as assigned
    // Object.keys(this.vendor.subcategories).forEach(subcategoryKey => {
    //   this.selectedSubcategories[subcategoryKey] = true;
    // });
    // this.allowSave = true;
  }

  /**
   * Assign vendor to selected subcategories
   */
  save(){
    let loading = this.loadingCtrl.create({
      content: 'Saving'
    });

    // this.allowedVendorCategoriesAndSubcategories.forEach(category => {
    //   if(category.subcategories){
    //     category.subcategories.forEach(subcategory => {
    //       if(this.selectedSubcategories[subcategory.$key] === false){
    //         // Remove Vendor which has already been assigned and unticked before saving.
    //         this._subcategoryService.removeVendor(this._basicVendorData, subcategory);
    //       }else if(this.selectedSubcategories[subcategory.$key] === true){
    //         // Add Vendor
    //         this._subcategoryService.addVendor(this._basicVendorData, subcategory);
    //       }
    //     });
    //   }
    // });

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
