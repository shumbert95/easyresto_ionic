import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://jeremyfsmoreau.fr/app_dev.php/';

@Injectable()
export class ClientProvider {

    constructor(public http: Http) {}

    getProfile() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Authorization', 'Bearer '+localStorage.getItem("token"))        

            this.http.get(apiUrl+'profile', {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        }).catch(function(error){
            return error;
        });
    }

    editProfile(data) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer '+localStorage.getItem("token"));
            headers.append('Access-Control-Allow-Origin', '*');      
            console.log(JSON.stringify(data));
            this.http.put(apiUrl+'profile', JSON.stringify(data), {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        }).catch(function(error){
            return error;
        });
    }

    getHistory() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Authorization', 'Bearer '+localStorage.getItem("token"))

            this.http.get(apiUrl+'history', {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        }).catch(function(error){
            return error;
        });
    }
}
