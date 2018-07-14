import { Component, ViewChild, ElementRef } from '@angular/core';
<<<<<<< HEAD
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
=======
import { IonicPage, NavController, NavParams } from 'ionic-angular';
>>>>>>> Update inte detail restau + page cart
import {RestaurantProvider} from "../../shared/providers/restaurant-provider";


/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cart: any;
  loading: any;
    public restaurantData: any;

    @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService: RestaurantProvider, private toastCtrl: ToastController) {
    this.cart = this.getCart();
    this.getRestaurantData();
  }

    formattedAddress() {
        return this.restaurantData.address ? this.restaurantData.address + ', ' + this.restaurantData.postalCode + ', ' + this.restaurantData.city : ''
    }

    getRestaurantData() {
      this.restaurantService.getRestaurantInfos(this.cart.restaurantId).then((result: any) => {
          if (result) {
              this.restaurantData = result.result;
              this.restaurantData.formattedAddress = this.formattedAddress();
          }
      }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
      });
    }


    presentToast(msg) {

        let msgText = msg.status == 401 ? 'L\'email et/ou le mot de passe est/sont incorrect(s)' : msg;
        let toast = this.toastCtrl.create({
            message: msgText,
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
}
