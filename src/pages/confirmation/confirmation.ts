import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestaurantProvider} from "../../shared/providers/restaurant-provider";

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  public cart: any;
  loading: any;
  public restaurantData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantProvider: RestaurantProvider) {
    this.cart = navParams.get("cart");
    this.getRestaurantInfos();
    localStorage.setItem('cart', JSON.stringify({'restaurantId': 0, 'order': [], 'totalPrice': 0}));
  }


  getRestaurantInfos() {
      this.restaurantProvider.getRestaurantInfos(this.cart.restaurantId).then((result: any) => {
          if (result) {
              this.restaurantData = result.result;
              this.restaurantData.formattedDate = this.formatDate(this.cart.date);
          }
      }, (err) => {
          // this.loading.dismiss();
      });
  }

  formatDate(inputDate) {
      let splitDate = inputDate.split('-');
      if(splitDate.count == 0){
          return null;
      }

      let year = splitDate[0];
      let month = splitDate[1];
      let day = splitDate[2];

      return day + '\\' + month + '\\' + year;
  }


}
