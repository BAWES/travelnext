import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

/*
  Handles all User functions
*/
@Injectable()
export class UserService {

  constructor(
    private _db: AngularFireDatabase,
    ) { 
    }

    

}
