import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { RestaurantProvider } from '../../../shared/providers/restaurant-provider';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, Marker} from "@ionic-native/google-maps";


declare var google;
let map: any;
let infowindow: any;
let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public restaurantData;
  public restaurantSchedule: any;
  loading: any;
  map: GoogleMap;
  public latitude;
  public longitude;
  public markers = [];

  @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantProvider: RestaurantProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {
    this.restaurantData = navParams.get("restaurantData");   
    console.log(this.restaurantData);

  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
        content: 'Chargement...'
    });
    this.loading.present();
  }  

  ionViewDidLoad() {
    this.restaurantData.addressFormatted = this.formattedAddress();
    this.latitude = this.restaurantData.latitude;
    this.longitude = this.restaurantData.longitude;
    this.initMap();

    this.restaurantProvider.getRestaurantSchedule(this.restaurantData.id).then((result: any) => {
        if (result) {
          this.restaurantSchedule = result.result;
        }
    }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
    });
    console.log('ionViewDidLoad DetailPage');
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

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      var userLat = String(location.coords.latitude);
      var userLng = String(location.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: this.latitude, lng: this.longitude},
        zoom: 15
      });
      var placeLoc = new google.maps.LatLng(parseFloat(this.latitude),parseFloat(this.longitude));
      var marker = new google.maps.Marker({
          map: this.map,
          position: placeLoc,
          title: "Restau !"
      });
      
      var placeLoc = new google.maps.LatLng(parseFloat(userLat),parseFloat(userLng));

      var userMarker = new google.maps.Marker({
        map: this.map,
        position: placeLoc,
        label: "M",
        title: "Moi !"
    });
      console.log(marker);
    }, (error) => {
      console.log(error);
    }, options);
    
    
  }
  
  

  formattedAddress() {
    return this.restaurantData.address ? this.restaurantData.address + ', ' + this.restaurantData.postalCode + ', ' + this.restaurantData.city : ''
  }

}
