import { Injectable } from '@angular/core';

import { Platform, Events } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';

/*
  Handles all Auth functions
*/
@Injectable()
export class AuthService {

  // Logged in agent details
  public isLoggedIn: boolean = false;
  public displayName: string;
  public photo: string;
  public email: string;
  public uid: string;
  
  constructor(
    private _platform: Platform,
    private _events: Events,
    private _db: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _google: GooglePlus,
    private _fb: Facebook
    ) { 
        this.listenForAuthStatusChange();
    }

    /**
     * Listen for auth status changes for rest of the app
     */
    listenForAuthStatusChange(){
        this._afAuth.authState.subscribe(user => {
            if (!user) {
                this.isLoggedIn = false;
                this.displayName = null;   
                this.email = null;
                this.uid = null;
                this.photo = null;
                this._events.publish("user:logout");
                return;
            }
            // User successfully logged in.
            this.isLoggedIn = true;
            this.displayName = user.displayName;      
            this.email = user.email;
            this.uid = user.uid;
            this.photo = user.photoURL;

            // Update user latest data
            this._db.object(`/users/${user.uid}`).update({
                displayName: user.displayName,
                displayNameLowercase: user.displayName.toLowerCase(),
                profilePhoto: user.photoURL,
                lastOnline: firebase.database.ServerValue.TIMESTAMP
            });

            // Publish Logged in event
            this._events.publish("user:login");
        });
    }

    /**
     * Login via Google
     */
    loginWithGoogle(){
        if (this._platform.is('cordova')) {
            this._google.login({
                'webClientId': '875187117160-msudr6cpdrmqd3h2tt08ue316qgvkq7v.apps.googleusercontent.com',
                'offline': true
            }).then(res => {
                // console.log(res);
                const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
                return firebase.auth().signInWithCredential(googleCredential);
            }).catch(err => console.error(err));
        }else {
            this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
                // console.log(res);
            });
        }
    }

    /**
     * Login via Facebook
     */
    loginWithFacebook(){
        if (this._platform.is('cordova')) {
            return this._fb.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
                // console.log(res);
                const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                return firebase.auth().signInWithCredential(facebookCredential);
            });
        }else {
            this._afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
                // console.log(res);
            });
        }
    }

    /**
     * Logs a user out
     */
    logout(){
        this._afAuth.auth.signOut();
    }
}
