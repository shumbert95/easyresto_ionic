import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { ClientProvider } from '../../shared/providers/client-provider';
import { AuthProvider } from '../../shared/providers/auth-provider';
import { Login } from '../login/login';
import {Http} from '@angular/http';
import {ClientPage} from "../client/client";
import {Search} from "../search/search";

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

    constructor(public app: App, public navCtrl: NavController,public authService: AuthProvider, public clientService: ClientProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public http: Http) {
        if(localStorage.getItem("token")) {
            this.isLoggedIn = true;
        }
        this.title = "Home";
    }

    logout() {
        this.showLoader();
        this.authService.logout();
        this.loading.dismiss();
        let nav = this.app.getRootNav();
        nav.setRoot(Login);
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

    goToProfile(){
        this.navCtrl.setRoot(ClientPage);
    }

    goToSearch(){
        this.navCtrl.setRoot(Search);
    }

    ngOnInit(){
    }
}
