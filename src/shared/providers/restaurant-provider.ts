import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'https://jeremyfsmoreau.fr/app_dev.php/';

@Injectable()
export class RestaurantProvider {

    constructor(public http: Http) {}

    getContentInfos(restaurantId, contentId) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.get(apiUrl+'restaurants/'+restaurantId+'/contents/'+contentId, {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

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
            this.http.get(apiUrl+'categories', {headers: headers})
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
            this.http.get(apiUrl+'moments', {headers: headers})
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

    checkAvailability(date, hour, nbParticipants, restaurantId) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.get(apiUrl+'restaurants/'+restaurantId+'/check_availability?date_from'+date+' '+hour+'&nb_participants'+nbParticipants, {headers: headers})
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

    confirmReservation(restaurantId, reservationId, response) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
            this.http.post(apiUrl + 'restaurants/' + restaurantId + '/reservations/' + reservationId + '/paypalconfirm/' + response.id, response,{headers: headers})
                .subscribe(res => {
                    if (res) {
                        resolve(res.json());
                    } else {
                        resolve({'result': []});
                    }
                }, (err) => {
                    reject(err);
                });
        });
    }

        createReservation(cart) {
            let data = this.formatCart(cart);
            return new Promise((resolve, reject) => {
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer '+localStorage.getItem("token"));
                this.http.post(apiUrl + 'restaurants/' + cart.restaurantId + '/reservations', JSON.stringify(data), {headers: headers})
                    .subscribe(res => {
                        if (res) {
                            console.log(res);
                            resolve(res.json());
                        } else {
                            resolve({'result': []});
                        }
                    }, (err) => {
                        reject(err);
                    });
            });
        }

        formatCart(cart) {
        console.log('test');
            let meals = [];
            for (let i = 0; i<cart.order.length; i++) {
                for (let j = 0; j<cart.order[i].quantity; j++) {
                    meals.push({id: cart.order[i].contentId});
                }
            }
        console.log('toto');
            return {
                date: cart.date + 'T' + cart.timeStep.replace('h',':') + ':00.000Z',
                timeStep: cart.timeStep.replace(':', 'h'),
                seats: [
                    {
                        name: "Mobile",
                        meals: meals,
                    }
                ],
                nbParticipants: cart.nbParticipants
            }
        }

}
