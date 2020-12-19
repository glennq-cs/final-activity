import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private _requestService: RequestService,    
    ) { }

  getProfile(): Observable<any> {
    return this._requestService.get('users/my', );
  }

  updateProfile(data: {}): Observable<any> {
    return this._requestService.put('users/my', data);
  }

  test(data: {}): Observable<any> {
    return this._requestService.post('', data);
  }
}
