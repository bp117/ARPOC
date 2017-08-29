import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs.component';
import { MapViewPage } from '../pages/mapView/mapView.component';
import { ARView } from '../pages/ar-view/ar-view';
import { ListViewPage } from '../pages/listView/listView.component';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { FetchNearByPropertiesService } from '../pages/fetchNearByProperties.service';

@NgModule({
  declarations: [
    MyApp,
    ListViewPage,
    ARView,
    MapViewPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListViewPage,
    ARView,
    MapViewPage,
    TabsPage
  ],
  providers: [
    FetchNearByPropertiesService,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
