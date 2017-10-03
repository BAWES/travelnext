import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { CountryPage } from '../country/country';

import { CountryService } from '../../providers/country.service';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  public isSearching = false;

  public friendList: FirebaseListObservable<any>;
  public friendSearchResults: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController, 
    public countrySrvc: CountryService,
    private _db: AngularFireDatabase
  ) {
  }

  loadUserPage(country){
    this.navCtrl.push(CountryPage, {
      country: country
    });
  }

  /**
   * Search for country that matches user input
   * @param  
   */
  search($event){
    let userInput = $event.target.value;

    if(!userInput){
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    let searchStr = userInput.toLowerCase();
    // Load search results based on input
    this.friendSearchResults = this._db.list("/users", {
      query: {
        orderByChild: 'displayNameLowercase',
        limitToFirst: 10,
        startAt: searchStr,
        endAt: searchStr+"\uf8ff"
      }
    });
  }

}
