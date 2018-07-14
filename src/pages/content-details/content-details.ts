import { Component } from '@angular/core';
import {
    AlertController, Events, IonicPage, LoadingController, NavController, NavParams,
    ToastController
} from 'ionic-angular';
import {RestaurantProvider} from "../../shared/providers/restaurant-provider";

/**
 * Generated class for the ContentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content-details',
  templateUrl: 'content-details.html',
})
export class ContentDetailsPage {
  public contentId;
  public restaurantId;
  public contentData: any;
  public calculatedPrice;
  public cart: any;
  loading: any;
  callback: any;
  public quantity = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService: RestaurantProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private events: Events) {
      this.contentId = navParams.get("contentId");
      this.restaurantId = navParams.get("restaurantId");
      this.callback = this.navParams.get('callback');
      this.cart = this.getCart();
      this.getContentInfos();
  }

    getContentInfos() {
      this.showLoader();
      this.restaurantService.getContentInfos(this.restaurantId, this.contentId).then((result: any) => {
          if (result) {
              this.contentData = result.result;
              this.calculatedPrice = this.contentData.price;
              this.loading.dismiss();
          }
      }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
      });
    }

    increaseQuantity() {
      this.quantity++;
    }

    decreaseQuantity() {
        this.quantity > 1 ? this.quantity-- : 1;
    }

    addToCart() {
        if (!this.cart.restaurantId || this.cart.restaurantId == this.restaurantId) {
            this.cart.restaurantId = this.restaurantId;
            this.cart.order.push({'contentId': this.contentId, 'quantity': this.quantity, 'name': this.contentData.name, 'price': this.contentData.price, 'picture': this.contentData.picture});
        } else {
            this.presentConfirm();
        }
        this.cart.totalPrice += (this.contentData.price * this.quantity);
        this.cart.totalPrice = parseFloat(this.cart.totalPrice.toFixed(2));
        this.setCart();
        this.navCtrl.pop().then(() => {
            this.events.publish('custom-user-events');
        });
    }

    setCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    getCart() {
      return JSON.parse(localStorage.cart);
    }

    presentConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Suppression du panier',
            message: 'Vous aviez déjà commencé une réservation dans un autre restaurant. Êtes vous sur de vouloir continuer ? Cela supprimera votre panier en cours.',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Ajouter',
                    handler: () => {
                        this.cart.order = [];
                        this.cart.totalPrice = 0;
                        this.cart.restaurantId = this.restaurantId;
                        this.addToCart();
                    }
                }
            ]
        });
        alert.present();
    }

    showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Chargement...'
        });

        this.loading.present();
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
}
