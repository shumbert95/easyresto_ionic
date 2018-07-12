import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://jeremyfsmoreau.fr/app_dev.php/';

@Injectable()
export class SearchProvider {

    constructor(public http: Http) {}

    search(latitude, longitude) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.get(apiUrl+'restaurants?latitude=' + latitude + '&longitude=' + longitude + '&exact=0', {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }
}
