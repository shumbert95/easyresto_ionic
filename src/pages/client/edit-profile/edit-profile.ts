import { Component } from '@angular/core';
import {NavController, App, NavParams, LoadingController, ToastController, IonicPage} from 'ionic-angular';
import { ClientProvider } from '../../../shared/providers/client-provider';
import { AuthProvider} from "../../../shared/providers/auth-provider";
import {Http} from '@angular/http';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  loading: any;
  isLoggedIn: boolean = false;
  profile = {email: '', civility: '', firstName: '', lastName: '', phoneNumber: '', postalCode: ''};
  facebookId: any;
  title: string;
  firstTime: boolean = false;

  constructor(public navParams: NavParams,public app: App, public navCtrl: NavController,public authService: AuthProvider, public clientService: ClientProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public http: Http) {
    if(localStorage.getItem("token")) {
        this.isLoggedIn = true;
    }
    this.title = "Profile";
    this.doGetProfile()
    this.firstTime = navParams.get('item');
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Chargement...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'bottom',
        dismissOnPageChange: false
    });

    toast.onDidDismiss(() => {
        console.log('Dismissed toast');
    });

    toast.present();
  }

  doGetProfile(){     
    this.showLoader();
    this.clientService.getProfile().then((data) => {
        this.loading.dismiss();
        this.profile = data.result.user;
        console.log(data.result);
        this.facebookId = data.result.user.facebookId;
    }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
    });
  }

  doEditProfile() {
    this.showLoader();
    this.clientService.editProfile(this.profile).then((result) => {
        this.loading.dismiss();
        this.navCtrl.setRoot(ProfilePage);
    }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
    });
  }
}
