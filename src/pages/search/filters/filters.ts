import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the FiltersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {
  public categoriesFilters;
  public momentsFilters;
  public categories;
  public moments;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.categories = this.navParams.get('categories');
    this.moments = this.navParams.get('moments');
    this.categoriesFilters = this.navParams.get('categoriesFilters');
    this.momentsFilters = this.navParams.get('momentsFilters');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  updateFilters(filterId,typeFilter){
    if(typeFilter==1){
        if (this.categoriesFilters.indexOf(filterId) == -1) {
            this.categoriesFilters.push(filterId);
        } else {
            this.categoriesFilters.splice(this.categoriesFilters.indexOf(filterId), 1);
        }
    }
    if(typeFilter==2){
        if (this.momentsFilters.indexOf(filterId) == -1) {
            this.momentsFilters.push(filterId);
        } else {
            this.momentsFilters.splice(this.momentsFilters.indexOf(filterId), 1);
        }
    }
  }

  applyFilters(){
    this.viewCtrl.dismiss({
      'categoriesFilters': this.categoriesFilters, 
      'momentsFilters' : this.momentsFilters
    });
  }

  isChecked(filterId,typeFilter){
    console.log("am i in ?");
    if(typeFilter==1){
      console.log(this.categoriesFilters.indexOf(filterId) >= 0);
      return this.categoriesFilters.indexOf(filterId) >= 0;
    }
    if(typeFilter==2){
      console.log(this.momentsFilters.indexOf(filterId) >= 0);
      return this.momentsFilters.indexOf(filterId) >= 0;
    }
  }

}
