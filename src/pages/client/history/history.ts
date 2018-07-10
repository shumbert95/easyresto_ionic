import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController, IonicPage} from 'ionic-angular';
import { ClientProvider } from "../../../shared/providers/client-provider";


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public userReservations: any;
  public loading: any;

    constructor(public app: App, public navCtrl: NavController, public clientService: ClientProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.getReservations();
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Chargement...'
      });

      this.loading.present();
  }

  addToFavorite(restaurantId) {
      console.log('test');
      this.showLoader();
      this.clientService.addToFavorite(restaurantId).then((data) => {
          this.loading.dismiss();
          this.presentToast('Ce restaurant a été ajouté à vos favoris.');
      });
  }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

  getReservations(){
      this.showLoader();
      this.clientService.getReservations().then((data) => {
          this.loading.dismiss();
          this.userReservations = data.result;
      }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
