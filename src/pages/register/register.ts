import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../shared/providers/auth-provider';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class Register {

    loading: any;
    registerCredentials = { email:'', firstName:'', lastName: '', password: '', passwordConfirmation: '', civility: '', phoneNumber: '', postalCode: '', birthDate: '' };

    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

    doSignup() {
        this.showLoader();
        this.authService.register(this.registerCredentials).then((result) => {
            this.loading.dismiss();
            this.navCtrl.pop();
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
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
            dismissOnPageChange: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

}