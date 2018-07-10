import {Component, Input} from '@angular/core';
import { NavController, App} from 'ionic-angular';

@Component({
    selector: 'app-header',
    templateUrl: 'header.html',
    inputs: ['title', 'filters']
})
export class HeaderComponent{
    @Input('title') title: string;

    constructor(public app: App, public navCtrl: NavController){}
}
