import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';

// Pages
import { Login } from '../pages/login/login';
import { Register } from "../pages/register/register";
import { Restaurant } from "../pages/restaurant/restaurant";
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { Search } from '../pages/search/search';
import { ProfilePage } from '../pages/client/profile/profile';
import { EditProfilePage } from '../pages/client/edit-profile/edit-profile';
import { ClientPage } from "../pages/client/client";
import { HistoryPage } from "../pages/client/history/history";
import { CartPage } from "../pages/cart/cart";

// Providers

import { AuthProvider } from "../shared/providers/auth-provider";
import { ClientProvider } from "../shared/providers/client-provider";
import { RestaurantProvider } from "../shared/providers/restaurant-provider";

// Components
import {ComponentsModule} from "../shared/components/components.module";
import {HeaderComponent} from "../shared/components/header/header";


@NgModule({
  declarations: [
    MyApp,
    Login,
    Register,
    CartPage,
    Restaurant,
    ItemDetailsPage,
    ListPage,
    Search,
    ProfilePage,
    EditProfilePage,
    ClientPage,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Restaurant,
    Search,
    ItemDetailsPage,
    ListPage,
    HeaderComponent,
    HeaderComponent,
    Register,
    ProfilePage,
    EditProfilePage,
    ClientPage,
    CartPage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ClientProvider,
    RestaurantProvider
  ]
})
export class AppModule {
}
