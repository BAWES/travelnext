import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { UserProfilePage } from '../user-profile/user-profile';


@Component({
  selector: 'page-friend-search',
  templateUrl: 'friend-search.html'
})
export class FriendSearchPage {

  public friendSearchResults: any;

  constructor(
    public navCtrl: NavController, 
    private _db: AngularFireDatabase
  ) {
    this.friendSearchResults = this._db.list("/users", {
      query: {
        limitToLast: 10,
      }
    });
  }

  loadUserPage(user){
    this.navCtrl.push(UserProfilePage, {
      user: user
    });
  }

  /**
   * Search for country that matches user input
   * @param  
   */
  search($event){
    let userInput = $event.target.value;

    let searchStr = userInput.toLowerCase();
    // Load search results based on input
    this.friendSearchResults = this._db.list("/users", {
      query: {
        orderByChild: 'displayNameLowercase',
        limitToFirst: 10,
        startAt: searchStr,
        endAt: searchStr+"\uf8ff"
      }
    }).map(result => {
      if(result.length > 0) return result;
      return false;
    });
  }

}
