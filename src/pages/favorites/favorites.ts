import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController, IonicPage} from 'ionic-angular';
import { ClientProvider } from "../../shared/providers/client-provider";
import {Restaurant} from "../restaurant/restaurant";

@IonicPage()
@Component({
    selector: 'page-favorites',
    templateUrl: 'favorites.html',
})
export class FavoritesPage {
    public userFavorites: any = null;
    public loading: any;
    public hasFavorites: boolean;
    public cart: any;

    constructor(public app: App, public navCtrl: NavController, public clientService: ClientProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
        this.getFavorites();
        this.cart = this.getCart();
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Chargement...'
        });

        this.loading.present();
    }

    toRestaurant(restaurantId) {
        this.navCtrl.push(Restaurant, {
            restaurantId: restaurantId
        })
    }

    removeFromFavorites(restaurantId) {
        this.clientService.removeFromFavorites(restaurantId).then((data) => {
            this.loading.dismiss();
            this.presentToast('Ce restaurant a été supprimé de vos favoris.');
            this.userFavorites = this.getFavorites();
        });
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

    getCart() {
        return JSON.parse(localStorage.cart);
    }
    ionViewWillEnter() {
        this.cart = this.getCart();
    }

    getFavorites(){
        this.showLoader();
        this.clientService.getFavorites().then((data: any) => {
            this.loading.dismiss();
            if (data.result !== undefined && data.result.length && data.result[0] != []) {
                if (!(data.result[0] instanceof Array)) {
                    this.userFavorites = data.result;
                    this.hasFavorites = true;
                }
            }
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }
}
