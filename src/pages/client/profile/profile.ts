import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { ClientProvider } from '../../../shared/providers/client-provider';
import { AuthProvider } from "../../../shared/providers/auth-provider";
import { Login } from '../../login/login';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { FavoritesPage } from "../../favorites/favorites";

import {Http} from '@angular/http';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    loading: any;
    isLoggedIn: boolean = false;
    profile: any;
    title: string;
    public cart: any;

    constructor(public app: App, public navCtrl: NavController,public authService: AuthProvider, public clientService: ClientProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public http: Http, public modalCtrl: ModalController) {
        if(localStorage.getItem("token")) {
            this.isLoggedIn = true;
        }
        this.title = "Profile";
        this.cart = this.getCart();
        this.doGetProfile()
    }

    logout() {
        console.log('toto');
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

    toEdit(){
      this.navCtrl.push(EditProfilePage);
    }

    toFavorites() {
        this.navCtrl.push(FavoritesPage);
    }

    doGetProfile(){     
        this.showLoader();
        this.clientService.getProfile().then((data) => {
            this.loading.dismiss();
            this.profile = data.result.user;
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }

    getCart() {
        return JSON.parse(localStorage.cart);
    }
    ionViewWillEnter() {
        this.cart = this.getCart();
    }

    ngOnInit(){
            }
}
