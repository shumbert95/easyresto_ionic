import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController, IonicPage} from 'ionic-angular';
import { Login } from '../login/login';
import {HistoryPage} from "../client/history/history";
import {ProfilePage} from "../client/profile/profile";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {

    isLoggedIn: boolean = false;
    tabProfile = ProfilePage;
    tabHistory = HistoryPage;

    constructor(public app: App, public navCtrl: NavController) {
        if(!localStorage.getItem('token') || localStorage.getItem('token') == 'undefined') {
            this.navCtrl.setRoot(Login)
        } else {
            this.isLoggedIn = true;
        }
    }
}
