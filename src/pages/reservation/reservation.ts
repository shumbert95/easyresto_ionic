import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RestaurantProvider} from "../../shared/providers/restaurant-provider";
import {PayPal, PayPalConfiguration, PayPalPayment} from "@ionic-native/paypal";
import {ConfirmationPage} from "../confirmation/confirmation";

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
  loading: any;
  public nbParticipants: any;
  public restaurantSchedule: any;
  public yearValues: any;
  public hourValues = [];
  public minDate: any;
  public nbSeats: any;
  public monthShortNames = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
  public dayShortNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService: RestaurantProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, private payPal: PayPal) {
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
      this.nbParticipants <= 0 ? this.nbParticipants = 1 : '';
    }

    pay() {
        let dateNow = new Date();
        let dateReservation = new Date(this.cart.date  + ' ' + this.cart.timeStep);
        this.cart.nbParticipants = this.nbParticipants;
        console.log('conf');
        this.navCtrl.setRoot(ConfirmationPage,
            {
            cart: this.cart
            });

        // if (dateNow < dateReservation) {
        //     this.restaurantService.createReservation(this.cart).then((result: any) => {
        //         if (result) {
        //             console.log(result);
        //             this.cart.reservationId = result.result.id;
        //         }
        //     }, (err) => {
        //         this.presentToast(err);
        //     });
        //     this.payPal.init({
        //         PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
        //         PayPalEnvironmentSandbox: 'AYnlL7E0vRNLBN6j_vQWJRSzllnBKS6bhhbv2ZZNZoAlP5HE9bIldrb_Z1UFbt0S40gkfSjEsuLBA8FZ'
        //     }).then(() => {
        //         // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        //         this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        //             // Only needed if you get an "Internal Service Error" after PayPal login!
        //             //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        //         })).then(() => {
        //             let payment = new PayPalPayment(this.cart.totalPrice, 'EUR', 'Easyresto', 'sale');
        //             this.payPal.renderSinglePaymentUI(payment).then((result: any) => {
        //                 // Successfully paid
        //                 console.log('success');
        //                 console.log(result);
        //
        //                 // Example sandbox response
        //                 //
        //                 // {
        //                 //   "client": {
        //                 //     "environment": "sandbox",
        //                 //     "product_name": "PayPal iOS SDK",
        //                 //     "paypal_sdk_version": "2.16.0",
        //                 //     "platform": "iOS"
        //                 //   },
        //                 //   "response_type": "payment",
        //                 //   "response": {
        //                 //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //                 //     "state": "approved",
        //                 //     "create_time": "2016-10-03T13:33:33Z",
        //                 //     "intent": "sale"
        //                 //   }
        //                 // }
        //                 this.restaurantService.confirmReservation(this.cart.restaurantId, this.cart.reservationId, result.response).then((result: any) => {
        //                     if (result) {
        //                         this.loading.dismiss();
        //                         this.navCtrl.setRoot(ConfirmationPage);
        //                     }
        //                 }, (err) => {
        //                     this.loading.dismiss();
        //                     this.presentToast(err);
        //                 });
        //             }, (err) => {
        //                 console.log('1');
        //                 console.log(err);
        //                 // Error or render dialog closed without being successful
        //             });
        //         }, (err) => {
        //             console.log('2');
        //             console.log(err);
        //         });
        //     }, (err) => {
        //         console.log('3');
        //         console.log(err);
        //         // Error in initialization, maybe PayPal isn't supported or something else
        //     });
        // } else {
        //     this.presentToast('Cette date n\'est pas disponible.');
        // }
    }

    showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Connexion...'
        });

        this.loading.present();
    }

  checkAvailability() {
      this.cart.timeStep = this.myDate_hour;
      this.showLoader();
      if (!this.nbParticipants || !this.myDate_day || ! this.myDate_hour) {
          this.presentToast('Veuillez remplir tous les champs.');
      } else {
        this.restaurantService.checkAvailability(this.myDate_day, this.myDate_hour, this.nbParticipants, this.cart.restaurantId).then((result: any) => {
            if (result) {
                this.loading.dismiss();
                this.nbSeats = result.result.availability;
            }
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
      }
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

  onDateUpdate() {
      this.cart.date = this.myDate_day;
      let date = new Date(this.myDate_day + '');
      let n = date.getDay();
      for (let i = 0; i < this.restaurantSchedule[n].timeSteps.length; i++) {
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
