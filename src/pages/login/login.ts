import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../shared/providers/auth-provider';
import { Register } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

    loading: any;
    registerCredentials = {_username: '', _password: ''};
    data: any;

    constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    }

    doLogin() {
        this.showLoader();
        this.authService.login(this.registerCredentials).then((result) => {
            this.loading.dismiss();
            this.data = result;
            localStorage.setItem('token', this.data.token);
            this.navCtrl.setRoot('Search');
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }

    register() {
        this.navCtrl.push(Register);
    }

    showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Connexion...'
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
