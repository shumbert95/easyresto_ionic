import { Component, ViewChild, ElementRef } from '@angular/core';
<<<<<<< HEAD
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
=======
import { IonicPage, NavController, NavParams } from 'ionic-angular';
>>>>>>> Update inte detail restau + page cart
import {RestaurantProvider} from "../../shared/providers/restaurant-provider";
import {GoogleMaps, GoogleMap, GoogleMapsEvent, Marker} from "@ionic-native/google-maps";


/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let google;
let map: any;
let infowindow: any;
let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cart: any;
  loading: any;
    map: GoogleMap;
    public latitude;
    public longitude;
    public markers = [];
    public restaurantData: any;

    @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService: RestaurantProvider, private toastCtrl: ToastController) {
    this.cart = this.getCart();
    this.getRestaurantData();
  }

    getRestaurantData() {
      this.restaurantService.getRestaurantInfos(this.cart.restaurantId).then((result: any) => {
          if (result) {
              this.restaurantData = result.result;
          }
      }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
      });
    }

    initMap() {
        navigator.geolocation.getCurrentPosition((location) => {
            let userLat = String(location.coords.latitude);
            let userLng = String(location.coords.longitude);
            this.map = new google.maps.Map(this.mapElement.nativeElement, {
                center: {lat: this.latitude, lng: this.longitude},
                zoom: 15
            });
            let restaurantLoc = new google.maps.LatLng(parseFloat(this.latitude),parseFloat(this.longitude));
            let marker = new google.maps.Marker({
                map: this.map,
                position: restaurantLoc,
                title: "Restau !"
            });

            let userLoc = new google.maps.LatLng(parseFloat(userLat),parseFloat(userLng));

            let userMarker = new google.maps.Marker({
                map: this.map,
                position: userLoc,
                label: "M",
                title: "Moi !"
            });
        }, (error) => {
            console.log(error);
        }, options);


    }

    getCart() {
        return JSON.parse(localStorage.cart);
    }
}
