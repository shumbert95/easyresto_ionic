import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController, IonicPage} from 'ionic-angular';
import { ClientProvider } from '../../shared/providers/client-provider';
import { AuthProvider } from '../../shared/providers/auth-provider';
import { Login } from '../login/login';
import {Http} from '@angular/http';
import {Search} from "../search/search";
import { Restaurant } from '../restaurant/restaurant'
import {HistoryPage} from "../client/history/history";
import {ClientPage} from "../client/client";
import {ProfilePage} from "../client/profile/profile";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {

    loading: any;
    isLoggedIn: boolean = false;
    profile: any;
    title: string;
    tabProfile: ProfilePage = ProfilePage;
    tabHistory: HistoryPage = HistoryPage;

    constructor(public app: App, public navCtrl: NavController,public authService: AuthProvider, public clientService: ClientProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public http: Http) {
        if(!localStorage.getItem('token') || localStorage.getItem('token') == 'undefined') {
            this.navCtrl.setRoot(Login)
        } else {
            this.isLoggedIn = true;
        }
    }

    logout() {
        this.showLoader();
        this.authService.logout();
        this.loading.dismiss();
        let nav = this.app.getRootNav();
        nav.setRoot(Login);
    }

    goToRestaurantPage() {
        this.navCtrl.push(Restaurant, {
            restaurantId: 2
        })
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();
    }


    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    goToSearch(){
        this.navCtrl.setRoot(Search);
    }

    ngOnInit(){
    }
}
