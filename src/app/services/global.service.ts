import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Store } from '@ngxs/store';
import { GetLogged } from '../states/auth.actions';

@Injectable({
  providedIn: 'root'

})
export class GlobalService {

  logged: any;

  constructor(
    private _store: Store
  ) { }
  
  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  getLogStatus(): void {
    this._store.dispatch(new GetLogged())
      .subscribe((status: any) => {
        this.logged = status.auth.logged;
    });

    return this.logged;
    
  }
}
