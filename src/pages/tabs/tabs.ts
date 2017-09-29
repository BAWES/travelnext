import { Component } from '@angular/core';

import { WorldPage } from '../world/world';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = WorldPage;

  constructor() {

  }
}
