import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GlobalService } from '../services/global.service';
import { ClearAuth } from '../states/auth.actions';
import Swall from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  ngContextMenu: any;

  isLogged: any;

  constructor(
    private _store: Store,
    private _globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this._globalService.getLogStatus();
  }

  onLogout(): void {

    this._store.dispatch(new ClearAuth());
    this._store.subscribe((response: any) => {
      if(response.auth.logged === false) {
        Swall.fire({
          icon: 'success',
          title: 'Logged Out Successfully',
        });
        this.router.navigate(['/logged-in']);
        this.isLogged = false;
      }
    });
  }

}
