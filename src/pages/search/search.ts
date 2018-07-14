import { NavController, Platform, ModalController, } from 'ionic-angular';
import {Component, ViewChild, ElementRef, NgZone} from '@angular/core';
import {SearchProvider} from "../../shared/providers/search-provider";
import { RestaurantProvider } from "../../shared/providers/restaurant-provider";
import {GoogleMaps, GoogleMap, GoogleMapsEvent, Marker} from "@ionic-native/google-maps";
import { Restaurant } from "../restaurant/restaurant";
import {Login} from "../login/login";

declare let google;
let map: any;
let infowindow: any;
let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {
    map: GoogleMap;
    public categories: any;
    public moments: any;
    public categoriesFilters = [];
    public momentsFilters = [];
    public latitude: any;
    public longitude: any;
    public markers = [];
    isLoggedIn: boolean;
    public currentRestaurant: any;
    public showDetails: boolean = false;
    searchText: string = '';
    public cart: any;


    @ViewChild('map') mapElement: ElementRef;
    constructor(public navCtrl: NavController, public searchService: SearchProvider, public restaurantService: RestaurantProvider, private zone: NgZone) {
        if(!localStorage.getItem('token') || localStorage.getItem('token') == 'undefined') {
            this.navCtrl.setRoot(Login)
        } else {
            this.isLoggedIn = true;
        }
        this.initMap();
        this.getCategories();
        this.getMoments();
        this.cart = this.getCart();
    }

    formattedAddress(address, postalCode, city) {
        return address ? address + ', ' + postalCode + ', ' + city : ''
    }

    onInputChange() {
        if (this.searchText.length >= 4 || this.searchText.length == 0) {
            this.searchService.search(this.latitude, this.longitude, this.categoriesFilters,this.momentsFilters, this.searchText).then((data: any) => {
                if (data.result.length) {
                    this.setMapOnAll(null);
                    this.markers = [];
                    for (let i = 0; i < data.result.length; i++) {
                        this.createMarker(data.result[i]);
                    }
                }
            }, (err) => {
                console.log(err);
            });
        }
    }

    initMap() {
        navigator.geolocation.getCurrentPosition((location) => {
            this.latitude =  location.coords.latitude;
            this.longitude =  location.coords.longitude;
            this.map = new google.maps.Map(this.mapElement.nativeElement, {
                // center: {lat: 48.8311081,  lng: 2.374514},
                center: {lat: location.coords.latitude, lng: location.coords.longitude},
                zoom: 12
            });

            this.searchService.search(location.coords.latitude, location.coords.longitude, this.categoriesFilters,this.momentsFilters, this.searchText).then((data: any) => {
                for (let i = 0; i < data.result.length; i++) {
                    this.createMarker(data.result[i]);
                }
            }, (err) => {
                console.log(err);
            });
            infowindow = new google.maps.InfoWindow();
        }, (error) => {
            console.log(error);
        }, options);
    }

    getCategories() {
        this.restaurantService.getCategories().then((data: any) => {
            this.categories = data.result;
        })
    }

    getMoments() {
        this.restaurantService.getMoments().then((data: any) => {
            this.moments = data.result;
        })
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

        this.searchService.search(this.latitude, this.longitude, this.categoriesFilters,this.momentsFilters, this.searchText).then((data: any) => {
            console.log(data);
            if (typeof(data.result) !== 'undefined') {
                this.setMapOnAll(null);
                this.markers = [];
                for (let i = 0; i < data.result.length; i++) {
                    this.createMarker(data.result[i]);
                }
            }
        }, (err) => {
            console.log(err);
        });
    }

    createMarker(place) {
        let placeLoc = new google.maps.LatLng(parseFloat(place.latitude),parseFloat(place.longitude));
        let marker = new google.maps.Marker({
            map: this.map,
            position: placeLoc
        });
        this.markers.push(marker);

        google.maps.event.addListener(marker, 'click',
            (e) => this.zone.run(() => {
                this.currentRestaurant = place;
                this.showDetails = true;
            }));
    }

    setMapOnAll(map) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    getCart() {
        return JSON.parse(localStorage.cart);
    }
    ionViewWillEnter() {
        this.cart = this.getCart();
    }

    closeModale() {
        this.showDetails = false;
        console.log(this);
    }

    toRestaurant(restaurantId) {
        this.navCtrl.push(Restaurant, {
            restaurantId: restaurantId
        })
    }
}