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
    this.friendSearchResults = friendSearchQuery.snapshotChanges().map(snapshot => {
      let friendData = [];
      snapshot.forEach(friend => {
        let user = friend.payload.val();
        user.$key = friend.key;
        friendData.push(user);
      });
      return friendData;
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
    this.friendSearchResults = this._db.list("/users", ref => {
      return ref.orderByChild('displayNameLowercase').limitToFirst(10).startAt(searchStr).endAt(searchStr+"\uf8ff");
    }).snapshotChanges().map(snapshot => {
      if(snapshot.length > 0){
        let friendData = [];
        snapshot.forEach(friend => {
          let user = friend.payload.val();
          user.$key = friend.key;
          friendData.push(user);
        });
        return friendData;
      };
      return false;
    });
  }

}
