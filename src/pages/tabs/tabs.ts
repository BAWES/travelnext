import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { FriendsPage } from '../friends/friends';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = FriendsPage;
  
  constructor() {

  }
}
