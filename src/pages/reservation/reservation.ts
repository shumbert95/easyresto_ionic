import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestaurantProvider} from "../../shared/providers/restaurant-provider";

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

  public myDate_day: any;
  public myDate_hour: any;
  public cart: any;
  public nbParticipants: any;
  public restaurantSchedule: any;
  public yearValues: any;
  public hourValues = [];
  public minDate: any;
  public monthShortNames = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
  public dayShortNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService: RestaurantProvider) {
      this.cart = this.getCart();
      this.yearValues = [(new Date()).getFullYear(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getFullYear()];
      this.minDate = new Date().toISOString();
      this.getSchedule();
  }

    getCart() {
        return JSON.parse(localStorage.cart);
    }

    ionViewWillEnter() {
        this.cart = this.getCart();
    }
    onNbParticipantsChange() {
      this.nbParticipants <= 0 ? this.NbParticipants = 1 : '';
    }

  checkAvailability() {

  }

  onDateUpdate() {
      let date = new Date(this.myDate_day);
      let n = date.getDay();
      for (let i = 0; i<this.restaurantSchedule[n].timeSteps.length; i++) {
          let hour = this.restaurantSchedule[n].timeSteps[i].substr(0, 2);
          if (this.hourValues.indexOf(hour) == -1) {
            this.hourValues.push(hour);
          }
      }
  }

  getSchedule() {
      this.restaurantService.getRestaurantSchedule(this.cart.restaurantId).then((result: any) => {
          if (result) {
              this.restaurantSchedule = result.result;
          }
      }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

}
