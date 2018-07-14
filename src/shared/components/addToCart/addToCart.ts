import {Component, Input} from '@angular/core';
import { NavController, App} from 'ionic-angular';
import { CartPage } from "../../../pages/cart/cart";

@Component({
    selector: 'add-to-cart',
    templateUrl: 'addToCart.html',
    inputs: ['cart', 'filters']
})
export class AddToCartComponent{
    @Input('cart') cart: any;

    constructor(public app: App, public navCtrl: NavController){
    }

    toCart() {
        this.navCtrl.push(CartPage);
    }
}
