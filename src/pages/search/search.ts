import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {SearchProvider} from "../../shared/providers/search-provider";
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

    @ViewChild('map') mapElement: ElementRef;
    constructor(public navCtrl: NavController, public searchService: SearchProvider) {
        this.initMap();
    }

    initMap() {
        navigator.geolocation.getCurrentPosition((location) => {
            map = new google.maps.Map(this.mapElement.nativeElement, {
                center: {lat: 48.8311081, lng: 2.374514},
                // center: {lat: location.coords.latitude, lng: location.coords.longitude},
                zoom: 15
            });

            this.searchService.search(location.coords.latitude, location.coords.longitude).then((data: any) => {
                console.log(data);
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

    createMarker(place) {
        var placeLoc = new google.maps.LatLng(parseFloat(place.latitude),parseFloat(place.longitude));
        var marker = new google.maps.Marker({
            map: map,
            position: placeLoc
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }
}