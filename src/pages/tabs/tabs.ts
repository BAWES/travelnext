import { Component } from '@angular/core';

import { WorldPage } from '../world/world';
import { AccountPage } from '../account/account';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = WorldPage;
  tab3Root = AccountPage;

  constructor() {

  }
}
