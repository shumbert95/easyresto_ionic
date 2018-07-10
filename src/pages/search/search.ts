import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../shared/providers/auth-provider';
import { Register } from '../register/register';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {

    // @ViewChild('map') mapElement: ElementRef;
    map: GoogleMap;


    constructor(public navCtrl: NavController,
        private _googleMaps: GoogleMaps,
        public authService: AuthProvider,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController) {

    }

    ionViewDidLoad(){
        this.loadMap();
    }

    // loadMap() {
    //     this.map = GoogleMaps.create('map_canvas');  
    //     this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    //     
    // });

    loadMap() {
        
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                lat: 43.0741904,
                lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };
    
        this.map = GoogleMaps.create('map_canvas', mapOptions);
    
        let marker: Marker = this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
            lat: 43.0741904,
            lng: -89.3809802
            }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            alert('clicked');
        });
    }
      

    // ngAfterViewInit() {
    //     this.initMap();
    // }

    // initMap(){
    //     let element = this.mapElement.nativeElement;
    //     this.map = this._googleMaps.create(element);        
    // }

}