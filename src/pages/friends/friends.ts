import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { UserProfilePage } from '../user-profile/user-profile';
import { FriendSearchPage } from '../friend-search/friend-search';

import { AuthService } from '../../providers/auth.service'
import { CountryService } from '../../providers/country.service'

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {
  public friendDataLoaded = false;

  public user;
  public friendData = [];
  
  public userSubscription;
  public followingSubscription;
  
  constructor(
    public navCtrl: NavController, 
    public db: AngularFireDatabase,
    private _auth: AuthService,
    public countrySrvc: CountryService
  ) {
    this.setupSubscriptions();
  }

  ionViewWillUnload(){
    this.userSubscription.unsubscribe();
    this.followingSubscription.unsubscribe();
  }

  setupSubscriptions(){
    this.userSubscription = this.db.object(`/users/${this._auth.uid}`).snapshotChanges().subscribe((result) => {
      this.user = result;
    });

    this.followingSubscription = this.db.list(`/user-following/${this._auth.uid}`).snapshotChanges().subscribe((friendlist) => {
      this.friendDataLoaded = true;
      this.friendData = [];
      friendlist.forEach(friend => {
        this.db.object(`/users/${friend.payload.key}`).snapshotChanges().take(1).subscribe(userData => {
          this.friendData.push(userData);
        });
      });
    });
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
