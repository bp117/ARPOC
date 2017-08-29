import { Component } from '@angular/core';

import { MapViewPage } from '../mapView/mapView.component';
import { ARView } from '../ar-view/ar-view';
import { ListViewPage } from '../listView/listView.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapViewPage;
  tab2Root = ARView;
  tab3Root = ListViewPage;

  constructor() {

  }
}
