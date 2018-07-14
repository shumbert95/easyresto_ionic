import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService: RestaurantProvider) {
    this.cart = this.getCart();
    this.getRestaurantData();
  }

    getRestaurantData() {
      this.restaurantService.getRestaurantInfos(this.cart.restaurantId).then((result: any) => {
          if (result) {
              this.restaurantData = result.result;
          }
      }, (err) => {
          // this.loading.dismiss();
          // this.presentToast(err);
      });
    }

    getCart() {
        return JSON.parse(localStorage.cart);
    }
}
