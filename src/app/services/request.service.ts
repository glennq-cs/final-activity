import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _apiEndpoint = 'https://stage-api-ubertickets.cloudstaff.com/v1/';

  constructor(
    private _httpClient: HttpClient,
    private _globalService: GlobalService,
  ){ }

  get(url = ''): Observable<any> {
    return this._httpClient.get(this._apiEndpoint + url,  { headers: this.getHeader() } );
  }

  post(url = '', data = {}): Observable<any> {
    return this._httpClient.post(this._apiEndpoint + url, data, { headers: this.getHeader() });
  }

  put(url = '', data = {}): Observable<any> {
    return this._httpClient.put(this._apiEndpoint + url, data, { headers: this.getHeader() });
  }

  delete(url = ''): Observable<any> {
    return this._httpClient.delete(this._apiEndpoint + url);
  }

  getTickets(url = ''): Observable<any> {
    return this._httpClient.get(this._apiEndpoint + url,  { headers: this.getHeader() } );
  }

  getTicket(url = ''): Observable<any> {
    return this._httpClient.get(this._apiEndpoint + url,  { headers: this.getHeader() } );
  }

  private getHeader() {
    return new HttpHeaders({'Authorization': 'Bearer ' + this._globalService.getToken() });
  }

}
