import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth.service';

/*
  Handles all User functions
*/
@Injectable()
export class UserService {

  constructor(
    private _db: AngularFireDatabase,
    private _auth: AuthService
    ) { 
    }

    updateCountrySelection(selectionData){
      this._db.object(`/users/${this._auth.uid}/country-selection`).set(selectionData);
    }

}
