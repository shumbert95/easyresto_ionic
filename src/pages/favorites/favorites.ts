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

    constructor(public app: App, public navCtrl: NavController, public clientService: ClientProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
        this.getFavorites();
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

    getFavorites(){
        this.showLoader();
        this.clientService.getFavorites().then((data) => {
            this.loading.dismiss();
            this.userFavorites = data.result;
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }
}
