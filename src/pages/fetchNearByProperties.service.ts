import { Injectable }      from '@angular/core';
import { Http, Response }   from '@angular/http';
 import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Headers } from '@angular/http';
import{Property} from './Property';
@Injectable()
export class FetchNearByPropertiesService {

  //public   BASE_URL = "http://10.91.103.169:8091/foreclosure/nearby/property/37.7896/-122.402";
  private BASE_URL = './PropertiesJson.json'; 

    public   METHOD =  "POST"; 
  constructor (private http: Http) {}
 
 public getProperties(): Promise<any> {
    return this.http.get(this.BASE_URL)
                    .map(this.extractData).toPromise()
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}