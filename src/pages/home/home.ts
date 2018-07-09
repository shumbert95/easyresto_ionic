import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../shared/providers/auth-provider';
import { Login } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {

    loading: any;
    isLoggedIn: boolean = false;

    constructor(public app: App, public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
        if(localStorage.getItem("token")) {
            this.isLoggedIn = true;
        }
    }

    logout() {
        this.showLoader();
        this.authService.logout();
        this.loading.dismiss();
        let nav = this.app.getRootNav();
        nav.setRoot(Login);
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();
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

}