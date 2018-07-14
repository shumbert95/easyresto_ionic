import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  public myDate: any;
  public cart: any;
  public nbParticipants: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.cart = this.getCart();
  }

    getCart() {
        return JSON.parse(localStorage.cart);
    }

    ionViewWillEnter() {
        this.cart = this.getCart();
    }
    onInputChange() {
      if (!this.nbParticipants instanceof int ) {
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

}
