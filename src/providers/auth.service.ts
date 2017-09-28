import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';

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
  public isAdmin: boolean = false;
  public displayName: string;
  public email: string;
  public uid: string;
  
  constructor(
    private _platform: Platform,
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
                return;
            }
            // User successfully logged in.
            this.isLoggedIn = true;
            this.displayName = user.displayName;      
            this.email = user.email;
            this.uid = user.uid;
            this.checkIfUserIsAdmin(user.uid);
        });
    }

    /**
     * Check if logged in user is admin
     */
    checkIfUserIsAdmin(uid: string){
        if(!this.isLoggedIn) return;
        this._db.object(`/admins/${uid}`)
            .take(1)
            .subscribe(adminRecord => this.isAdmin = adminRecord.$exists());
    }

    /**
     * Login via Google
     */
    loginWithGoogle(){
        if (this._platform.is('cordova')) {
            this._google.login({
                'webClientId': '970489212684-7u4bbdcqp5k8n4psaj21jtk0aq2n48jv.apps.googleusercontent.com',
                'offline': true
            }).then(res => {
                console.log(res);
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

        // Clear previous data
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.displayName = null;
        this.email = null;
    }
}
