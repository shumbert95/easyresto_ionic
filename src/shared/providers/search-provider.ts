import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://jeremyfsmoreau.fr/app_dev.php/';

@Injectable()
export class SearchProvider {

    constructor(public http: Http) {}

    search(latitude, longitude, filters, searchText) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            var endpoint = apiUrl+'restaurants?latitude=' + latitude + '&longitude=' + longitude + '&exact=0';

            if (filters.length > 0) {
                for (var i = 0; i<filters.length; i++) {
                    endpoint += '&categories[]='+filters[i];
                }
            }
            if (searchText.length > 4) {
                endpoint += '&name='+searchText;
            }
            console.log(endpoint);
            this.http.get(endpoint, {headers: headers})
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
