import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { Login } from '../pages/login/login';
import { Register } from "../pages/register/register";
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/client/profile/profile';
import { EditProfilePage } from '../pages/client/edit-profile/edit-profile';
import { ClientPage } from "../pages/client/client";
import { HistoryPage } from "../pages/client/history/history";

// Providers
import { AuthProvider } from "../shared/providers/auth-provider";
import { ClientProvider } from "../shared/providers/client-provider";

// Components
import {ComponentsModule} from "../shared/components/components.module";
import {HeaderComponent} from "../shared/components/header/header";


@NgModule({
  declarations: [
    MyApp,
    Login,
    Register,
    ItemDetailsPage,
    ListPage,
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
    ItemDetailsPage,
    ListPage,
    HeaderComponent,
    Register,
    ProfilePage,
    EditProfilePage,
    ClientPage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ClientProvider
  ]
})
export class AppModule {
}
