import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from "./profile/profile";
import { HistoryPage } from "./history/history";

/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  tabProfile: ProfilePage;
  tabHistory: HistoryPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      // this.tabProfile = ProfilePage;
      // this.tabHistory = HistoryPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
  }

}
