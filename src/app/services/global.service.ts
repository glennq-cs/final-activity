import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { Subject } from 'rxjs'
import { Store } from '@ngxs/store';
import { GetLogged } from '../states/auth.actions';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'

})
export class GlobalService {

  logged: any;

  constructor(
    private _store: Store,
    private _pageTitle: Title
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

  setPageTitle(title: any): void {
    this._pageTitle.setTitle('My Tickets - ' + title);
  }
  
}
