import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../shared/providers/auth-provider';
import { Register } from '../register/register';
import {Home} from "../home/home";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { EditProfilePage } from '../client/edit-profile/edit-profile';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

    loading: any;
    registerCredentials = {_username: '', _password: ''};
    data: any;
    fbAuth: any;

    constructor(private fb: Facebook,public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
        if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
            this.navCtrl.setRoot(Home);
        }
    }

    doLogin() {
        this.showLoader();
        this.authService.login(this.registerCredentials).then((result) => {
            if (result.status == 401) {
                this.loading.dismiss();
                this.presentToast('Vos identifiants ne sont pas corrects.');
            } else {
                this.loading.dismiss();
                this.data = result;
                localStorage.setItem('token', this.data.token);
                localStorage.setItem('cart', JSON.stringify({'restaurantId': null, order: [], totalPrice: 0}));
                this.navCtrl.setRoot('Home');
            }

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
    
    facebookAuth(){
        this.fb.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {this.showLoader();
        this.authService.loginFacebook(res.authResponse).then((result) => {
            if (result.status == 401) {
                this.loading.dismiss();
                this.presentToast('Vos identifiants ne sont pas corrects.');
            } else {
                this.loading.dismiss();
                this.data = result;
                localStorage.setItem('token', this.data.result);
                localStorage.setItem('cart', JSON.stringify({'restaurantId': null, order: [], totalPrice: 0}));                
                this.navCtrl.setRoot('Home');
            }

        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }
    )
        .catch(e => console.log('Error logging into Facebook', e));

        
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
