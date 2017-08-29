import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FetchNearByPropertiesService } from '../fetchNearByProperties.service';
import { Property } from '../Property';

@Component({
  selector: 'page-listView',
  templateUrl: 'listView.html'
})
export class ListViewPage {

  items: Property[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public fetchNearByPropertiesService: FetchNearByPropertiesService) {

  }

  ionViewDidLoad() {
    this.loadList();
  }
  ngAfterViewInit() {
    console.log("listViewPage: Page loaded");
  }

  loadList() {
    this.fetchNearByPropertiesService.getProperties().then(response => {
      this.items = response;
    }, function(errorMessage) {
      this.errorMessage = errorMessage;
    });
  }

  itemSelected(item) {
    console.log(item);
  }

}
