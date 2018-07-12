import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {SearchProvider} from "../../shared/providers/search-provider";
import { RestaurantProvider } from "../../shared/providers/restaurant-provider";
import {GoogleMaps, GoogleMap, GoogleMapsEvent, Marker} from "@ionic-native/google-maps";
import { Restaurant } from "../restaurant/restaurant";

declare var google;
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
    public filters = [];
    public latitude: any;
    public longitude: any;
    public markers = [];
    searchText: string = '';


    @ViewChild('map') mapElement: ElementRef;
    constructor(public navCtrl: NavController, public searchService: SearchProvider, public restaurantService: RestaurantProvider) {
        if(!localStorage.getItem('token') || localStorage.getItem('token') == 'undefined') {
            this.navCtrl.setRoot(Login)
        } else {
            this.isLoggedIn = true;
        }
        this.initMap();
        this.getCategories();
    }

    onInputChange() {
        if (this.searchText.length >= 4 || this.searchText.length == 0) {
            this.searchService.search(this.latitude, this.longitude, this.filters, this.searchText).then((data: any) => {
                if (data.result.length) {
                    this.setMapOnAll(null);
                    this.markers = [];
                    for (var i = 0; i < data.result.length; i++) {
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
                zoom: 11
            });

            this.searchService.search(location.coords.latitude, location.coords.longitude, this.filters, this.searchText).then((data: any) => {
                for (var i = 0; i < data.result.length; i++) {
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

    updateFilters(categoryId){
        if (this.filters.indexOf(categoryId) == -1) {
            this.filters.push(categoryId);
        } else {
            this.filters.splice(this.filters.indexOf(categoryId), 1);
        }

        this.searchService.search(this.latitude, this.longitude, this.filters, this.searchText).then((data: any) => {
            this.setMapOnAll(null);
            this.markers = [];
            for (var i = 0; i < data.result.length; i++) {
                this.createMarker(data.result[i]);
            }
        }, (err) => {
            console.log(err);
        });
    }

    createMarker(place) {
        var placeLoc = new google.maps.LatLng(parseFloat(place.latitude),parseFloat(place.longitude));
        var marker = new google.maps.Marker({
            map: this.map,
            position: placeLoc
        });
        this.markers.push(marker);
    }
a
    setMapOnAll(map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }
}