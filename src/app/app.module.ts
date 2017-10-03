import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Ionic Storage 
import { IonicStorageModule } from '@ionic/storage';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


// Pages
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { FriendsPage } from '../pages/friends/friends';
import { CountryPage } from '../pages/country/country';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CountrySelectionPage } from '../pages/country-selection/country-selection';

// services
import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';
import { CountryService } from '../providers/country.service';

// native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

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
    HomePage,
    FriendsPage,
    CountryPage,
    LoginPage,
    TabsPage,
    CountrySelectionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    FriendsPage,
    CountryPage,
    LoginPage,
    TabsPage,
    CountrySelectionPage
  ],
  providers: [
    // Ionic Native
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // Custom
    AuthService,
    UserService,
    CountryService
  ]
})
export class AppModule {}
