import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// AF2 Dev Env Settings 
export const firebaseConfig = {
  apiKey: "AIzaSyBPnYYxbfSSDSQ1ALWcPqu54DFTUOH7Iy8",
  authDomain: "traveldiscuss-dc79d.firebaseapp.com",
  databaseURL: "https://traveldiscuss-dc79d.firebaseio.com",
  projectId: "traveldiscuss-dc79d",
  storageBucket: "traveldiscuss-dc79d.appspot.com",
  messagingSenderId: "875187117160"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
