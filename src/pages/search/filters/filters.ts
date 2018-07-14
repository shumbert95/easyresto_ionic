import { Component, Pipe } from '@angular/core';
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
    console.log(this.moments);
    this.categoriesFilters = this.navParams.get('categoriesFilters');
    this.momentsFilters = this.navParams.get('momentsFilters');
    this.sortArray(this.categories);
    this.sortArray(this.moments);
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
    if(typeFilter==1){
      return this.categoriesFilters.indexOf(filterId) >= 0;
    }
    if(typeFilter==2){
      return this.momentsFilters.indexOf(filterId) >= 0;
    }
  }

  sortArray(array,args="name"){
      array.sort((a: any, b: any) => {
        if ( a[args] < b[args] ){
          return -1;
        }else if( a[args] > b[args] ){
            return 1;
        }else{
          return 0;	
        }
      });
      return array;
    }
}


