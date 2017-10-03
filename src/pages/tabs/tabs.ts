import { Component } from '@angular/core';

import { WorldPage } from '../world/world';
import { HomePage } from '../home/home';
import { FriendsPage } from '../friends/friends';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = WorldPage;
  tab3Root = FriendsPage;
  
  constructor() {

  }
}
