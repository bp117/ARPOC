import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FetchNearByPropertiesService } from '../fetchNearByProperties.service';
import { Property } from '../Property';

declare var google;

@Component({
  selector: 'page-mapView',
  templateUrl: 'mapView.html'
})
export class MapViewPage {

  locations: Property[];
  errorMessage: string;
  showMapData: Boolean = false;
  showMapDataObj: Property;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public fetchNearByPropertiesService: FetchNearByPropertiesService, private elRef: ElementRef, private renderer: Renderer) {
    renderer.listen(elRef.nativeElement, 'click', (event) => {
      if(event.type){
        if(event.srcElement.parentElement.className.indexOf('mv-overlay') > -1 || event.srcElement.className.indexOf('mv-overlay') > -1){
           var id = event.srcElement.parentElement.parentElement.className.indexOf('mv-overlay');
          this.showMapData = true;
          this.showMapDataObj = JSON.parse(event.target.parentElement.parentElement.querySelector('.sr-only.locData').innerText);
        }
      }
    });
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.drawMap(position);
    }, (err) => {
/*      const position: any = {
        coords: {
          latitude: 17.422953,
          longitude: 78.377602
        }
      }
      this.drawMap(position);
      console.log(err);*/
    });
  }

  drawMap(p) {
    let latLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude)

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    //Adding current location marker
    var marker = new google.maps.Marker({
        map: this.map,
        title: "My Location",
        position: latLng
      });
    this.map.setCenter(marker.getPosition());
    
    this.fetchNearByPropertiesService.getProperties().then(response => {
      this.locations = response;
      this.setMarkers(this.map, this.locations);
    }, function(errorMessage) {
      this.errorMessage = errorMessage;
    });
  }

  setMarkers(map, locations) {
    var marker, i;
    for (i = 0; i < locations.length; i++) {
      let latlngset = new google.maps.LatLng(locations[i].latitude, locations[i].longitude);
      var marker = new google.maps.Marker({
        map: map,
        title: locations[i].name,
        position: latlngset
      });
      //map.setCenter(marker.getPosition());

      var content = "<div class='mv-overlay'><span class='sr-only locData'>" + JSON.stringify(locations[i]) + "</span><div class='c car'><i class='fa fa-2x fa-car'></i><div class='dist'>50mins</div></div><div class='c add'>" + locations[i].name + "</div><div class='c arrow'><i class='fa fa-lg fa-angle-right'></i></div></div>";
      var infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
        return function() {
          infowindow.setContent(content);
          infowindow.open(map, marker);
         
        };
      })(marker, content, infowindow));

      marker.addListener('click', function() {
        console.log("mama :" + this)
      });

      google.maps.event.addListener(infowindow, 'click', function() {
        console.log("I'm Closed");
      });
      google.maps.event.trigger(marker, 'click');
      google.maps.event.trigger(infowindow, 'click');
    }
  }
}
