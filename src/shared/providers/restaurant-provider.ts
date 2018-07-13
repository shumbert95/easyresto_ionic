import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://jeremyfsmoreau.fr/app_dev.php/';

@Injectable()
export class RestaurantProvider {

    constructor(public http: Http) {}

    getRestaurantInfos(id) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.get(apiUrl+'restaurants/'+id, {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getRestaurantSchedule(id) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.get(apiUrl+'restaurants/'+id+'/schedule', {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getRestaurantMenu(id) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.get(apiUrl+'restaurants/'+id+'/menu', {headers: headers})
                .subscribe(res => {
                    if (res){
                        resolve(res.json());
                    } else {
                        resolve({'result': []});
                    }
                }, (err) => {
                    reject(err);
                });
        });
    }

    getCategories() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.get(apiUrl+'restaurants/categories', {headers: headers})
                .subscribe(res => {
                    if (res){
                        resolve(res.json());
                    } else {
                        resolve({'result': []});
                    }
                }, (err) => {
                    reject(err);
                });
        });
    }

    getMoments() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.get(apiUrl+'restaurants/moments', {headers: headers})
                .subscribe(res => {
                    if (res){
                        resolve(res.json());
                    } else {
                        resolve({'result': []});
                    }
                }, (err) => {
                    reject(err);
                });
        });
    }
}
