import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     // statusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */      
      WikitudePlugin._sdkKey = "EYvxQVgvXWH4uw3UvJ6QU2DNkJE3Ax/Oqi6Q839Sx88fYMd7fPEAOOUBq91iEsRC15k0hUvmJvkXx9Obs1NLudSZK30zsp4hVUtPnSmT+MnhCVDuZ5HC2CTUpIW+MCneZ7SGAo3tyI+Yvy6ZPkhXZwKFxtplzebB7GKwPwbP4zZTYWx0ZWRfX2BfLJcDr9E1jCkhmewc3eoBLaQ3RhdXq6FD20HTJR+B691GDwkFg6CrltTw4sWntD5gotii6kJd+Ryw9XhK2+2RpIjZ9U0NmnRuaw1umEGCYm1bLXuUr98w+V97NZz+tBNd4xWM8QPCFW+rQnpYSbdkjzqMYpdBRCjved7REkygPUg9JQkHth48HgK11FC2Y5Bo/aQkosWPCQwmk/hAYh4tBPfV6/TC4mJoa2uIil6bY4YQCsRgqkLfqFvmURQOqFJgJH6AAtpRj9ESGfTMz1FU8r7rQ8DoS8bEYeFUj+PqboLs3veJbOi6Yc9MvTGX0qij5reSxTKGT1HDXK0gYy0a6tpVz5rt9EQxQ0pBoiexZXJWJAcWnTpAdOgJMpoDjdoIk7khtd0x3PgEJCYaNyKqQqWvfFGd+frTthwB/kHqoaclw+/1KpPYhvJ1Fe9WFiOt4tpD8QjsTY6ffy9h435VR6tvtdrxqKifneei3x2tjknYcHgjnyk=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */
    });
  }
}
