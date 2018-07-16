import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'https://jeremyfsmoreau.fr/app_dev.php/';
let apiUrls = 'https://jeremyfsmoreau.fr/app_dev.php/';


@Injectable()
export class AuthProvider {

    constructor(public http: Http) {}

    login(credentials) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(apiUrl+'login_check', JSON.stringify(credentials), {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        }).catch(function(error){
            return error;
        });
    }

    loginFacebook(res) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(apiUrls+'login/facebook', JSON.stringify(res), {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        }).catch(function(error){
            return error;
        });
    }


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

    register(data) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(apiUrl+'register/client', JSON.stringify(data), {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        }).catch(function(error){
            return error;
        });
    }

    logout(){
        localStorage.clear();
        return true;
    }

}
