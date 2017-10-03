import { Component, NgZone } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

// About will become splash page
import { AboutPage } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AboutPage;

  appFirstOpened = true;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _zone: NgZone,
    private _events: Events) 
  {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /**
   * Using Ng2 Lifecycle hooks because view lifecycle events don't trigger for Bootstrapped MyApp Component
   */
  ngOnInit(){
    // On Login Event, set root to Internal app page
    this._events.subscribe('user:login', (userEventData) => {
      this._zone.run(() => {
        // If app first opened, wait 2 seconds before navigating
        if(this.appFirstOpened){
          this.appFirstOpened = false;
          setTimeout(() => {
            this.rootPage = TabsPage;
          },1500);
        }else{
          this.rootPage = TabsPage;
        }
      });      
    });

    // On Logout Event, set root to Login Page
    this._events.subscribe('user:logout', (userEventData) => {
      this._zone.run(() => {
        // If app first opened, wait 2 seconds before navigating
        if(this.appFirstOpened){
          this.appFirstOpened = false;
          setTimeout(() => {
            this.rootPage = LoginPage;
          },1500);
        }else{
          this.rootPage = LoginPage;
        }
      });
    });
  }
}
