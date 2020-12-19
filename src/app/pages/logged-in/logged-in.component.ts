import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoginAuth } from '../../states/auth.actions';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { Login } from '../../models/logged-in.model';
import Swall from 'sweetalert2';
import { __decorate } from 'tslib';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  isLogged : any;
  loginForm: any;

  login: Login = {
    username: '',
    password: ''
  }

  constructor(
    private _store: Store,
    private _globalService: GlobalService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.isLogged = this._globalService.getLogStatus();

    if(this.isLogged) {
      this.router.navigate(['/']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
  }

  onLogin(): void {
    if (this.loginForm) {
      let ctr = 0;
      let ectr = 0;
      this.login = Object.assign({}, this.loginForm.value);
      this._store.dispatch( new LoginAuth(this.login, {}) );
      this._store.subscribe((status: any) => {
        
          if(status.auth.logged == true) {
            ++ctr;
          } else {
            if(status.auth.error && ectr === 1) {
              Swall.fire({
                icon: 'warning',
                title: 'Invalid Form!',
                text: status.auth.error
              });
            }
            ++ectr;
          }

          if(ctr === 1)  {
             Swall.fire({
              icon: 'success',
              title: 'Login successfully',
              showConfirmButton:false,
              timer: 1500
            });
            this.router.navigate(['/']);
          }
        }
      );
    } else {
      Swall.fire({
        icon: 'warning',
        title: 'Invalid Form!',
      });
    }
  }
}
