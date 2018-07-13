import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestaurantProvider } from '../../shared/providers/restaurant-provider';
import { ClientProvider } from "../../shared/providers/client-provider";
import { DetailPage } from "./detail/detail";



/**
 * Generated class for the RestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class Restaurant {
  public restaurantId;
  public restaurantData: any;
  public restaurantMenu: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public clientService: ClientProvider, public restaurantProvider: RestaurantProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
      this.restaurantId = navParams.get("restaurantId");
  }

  showLoader() {
      this.loading = this.loadingCtrl.create({
          content: 'Chargement...'
      });

      this.loading.present();
  }

  ionViewDidLoad() {
      this.showLoader();
      this.restaurantProvider.getRestaurantInfos(this.restaurantId).then((result: any) => {
          if (result) {
            this.restaurantData = result.result;
          }
          this.restaurantData.addressFormatted = this.formattedAddress();
      }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
      });

      this.restaurantProvider.getRestaurantMenu(this.restaurantId).then((result: any) => {
          if (result.result) {
            this.restaurantMenu = result.result;
            console.log(result);
          }
          this.loading.dismiss()
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

  formattedAddress() {
    return this.restaurantData.address ? this.restaurantData.address + ', ' + this.restaurantData.postalCode + ', ' + this.restaurantData.city : ''
  }

  detailsPage(restaurant){
    this.navCtrl.push(DetailPage, {
        restaurantData: restaurant
    });
  }
}
