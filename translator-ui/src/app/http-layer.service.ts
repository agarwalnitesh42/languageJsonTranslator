import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

@Injectable({
  providedIn: 'root'
})
export class HttpLayerService {
  private monitoring = {
    pendingRequestsNumber: 0
  };

  public counter = 0;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  get(url: string, options?: any): Observable<any> {
    try {
       return this._http.get(url)
    } catch (error) {
      console.error(error);
    }
  }

  post(url: string, data: any, values?: any): Observable<any> {
    try {
      console.log('url and data is ',url,data);
      return this._http.post(url, data, values);
    } catch (error) {
      console.error(error);
    }
  }

  public handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // this._toastLoad.toast('error', 'Error', 'Error while fetching data', true);
    // console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
