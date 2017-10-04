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
    let friendSearchQuery = this._db.list("/users", ref => {
        return ref.limitToLast(10);
    });
    this.friendSearchResults = friendSearchQuery.snapshotChanges();
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
    this.friendSearchResults = this._db.list("/users", ref => {
      return ref.orderByChild('displayNameLowercase').limitToFirst(10).startAt(searchStr).endAt(searchStr+"\uf8ff");
    }).snapshotChanges().map(result => {
      if(result.length > 0) return result;
      return false;
    });
  }

}
