import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserProfilePage } from '../user-profile/user-profile';
import { FriendSearchPage } from '../friend-search/friend-search';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  public friendList: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController, 
    public db: AngularFireDatabase
  ) {
  }

  loadUserPage(user){
    this.navCtrl.push(UserProfilePage, {
      user: user
    });
  }

  loadSearchPage(){
    this.navCtrl.push(FriendSearchPage);
  }

}
