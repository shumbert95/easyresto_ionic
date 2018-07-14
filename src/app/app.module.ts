import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import {HomeModule} from "../pages/home/home.module";
import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';
// import ColorHash from 'color-hash';

// Pages
import { Login } from '../pages/login/login';
import { Register } from "../pages/register/register";
import { Restaurant } from "../pages/restaurant/restaurant";
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/client/profile/profile';
import { EditProfilePage } from '../pages/client/edit-profile/edit-profile';
import { HistoryPage } from "../pages/client/history/history";
import { CartPage } from "../pages/cart/cart";
import { FavoritesPage } from "../pages/favorites/favorites";
import { Search } from "../pages/search/search";
import { FiltersPage } from "../pages/search/filters/filters";
import { DetailPage } from "../pages/restaurant/detail/detail";
import { ContentDetailsPage } from "../pages/content-details/content-details";

// Providers

import { AuthProvider } from "../shared/providers/auth-provider";
import { ClientProvider } from "../shared/providers/client-provider";
import { RestaurantProvider } from "../shared/providers/restaurant-provider";
import { SearchProvider } from "../shared/providers/search-provider";

// Components
import {ComponentsModule} from "../shared/components/components.module";
import {HeaderComponent} from "../shared/components/header/header";
import {Home} from "../pages/home/home";
import {SearchModule} from "../pages/search/search.module";
import {ReservationPage} from "../pages/reservation/reservation";


@NgModule({
  declarations: [
    MyApp,
    Login,
    Register,
    CartPage,
    Restaurant,
    ItemDetailsPage,
    ListPage,
    ProfilePage,
    EditProfilePage,
    HistoryPage,
    FavoritesPage,
    ContentDetailsPage,
    DetailPage,
    ReservationPage,
    FiltersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    HomeModule,
    GooglePlacesAutocompleteComponentModule,
    HttpModule,
    SearchModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Restaurant,
    ItemDetailsPage,
    ListPage,
    HeaderComponent,
    HeaderComponent,
    Register,
    ProfilePage,
    EditProfilePage,
    CartPage,
    Home,
    HistoryPage,
    Search,
    ContentDetailsPage,
    FavoritesPage,
    DetailPage,
    ReservationPage,
    FiltersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ClientProvider,
    RestaurantProvider,
    SearchProvider
  ]
})
export class AppModule {
}
