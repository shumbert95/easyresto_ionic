import {Component, Input} from '@angular/core';
import { ClientPage } from "../../../pages/client/client";
import {CartPage} from "../../../pages/cart/cart";
import { NavController, App} from 'ionic-angular';

@Component({
    selector: 'app-header',
    templateUrl: 'header.html',
    inputs: ['title', 'account', 'cart', 'filters']
})
export class HeaderComponent{
    @Input('title') title: string;
    @Input('account') account: string;
    @Input('cart') cart: string;

    constructor(public app: App, public navCtrl: NavController){}

    goToProfile(){
        this.navCtrl.push(ClientPage);
    }

    goToCart(){
        this.navCtrl.push(CartPage);
    }
}
