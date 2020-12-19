import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Store } from '@ngxs/store';
import { Profile } from '../../models/profile.model';
import { Router } from '@angular/router';
import { GetProfile, UpdateProfile } from '../../states/profile.actions';
import Swall from 'sweetalert2';

@Component({
  selector: 'app-myprofile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLogged: any;

  profileForm: any ;

  constructor(
    private _globalService: GlobalService,
    private _store: Store,
    private router: Router
  ) { }

  profile: Profile = {
    name        : '',
    job_title   : '',
    first_name  : '',
    last_name   : '',
    email       : '',
    mobile_number: '',
    username    : '',
    password    : '',
    alias       : ''
  }

  ngOnInit(): void {

    this.profileForm = new FormGroup({
      email           : new FormControl('',[Validators.required, Validators.email ]),
      first_name      : new FormControl('',[Validators.required]),
      last_name       : new FormControl('',[Validators.required]),
      alias           : new FormControl('',[Validators.required]),
      job_title       : new FormControl('',[Validators.required]),
      mobile_number   : new FormControl('',[Validators.required]),
      password        : new FormControl('',[]),
      confirm_password: new FormControl('',[]),
    });

    this.isLogged = this._globalService.getLogStatus();

    if(this.isLogged) {
      this._store.dispatch(new GetProfile(this.profile));
      this._store.subscribe((response: any) => {

        if(response.profile.profile) {
          let profileInfo = response.profile.profile;
          this.fillForm(profileInfo);
        }
      });
    } else  {
      Swall.fire({
        icon: 'error',
        title: 'Not Authorized',
      });
      this.router.navigate(['/logged-in']);
    }
  }

  fillForm(profile: any): void {
    this.profileForm.patchValue({
      first_name    : profile.meta.first_name,
      last_name     : profile.meta.last_name,
      email         : profile.email,
      alias         : profile.alias,
      job_title     : profile.meta.job_title,
      mobile_number : profile.meta.mobile_number,
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name    : formValues.first_name,
          last_name     : formValues.last_name,
          job_title     : formValues.job_title,
          mobile_number : formValues.mobile_number,
          timezone      : 'Asia/Manila'
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      };

      let ctr = 0
      this._store.dispatch(new UpdateProfile(newFormValues));
      this._store.subscribe((response: any) => {
        if (response.profile) {
          ++ctr;
        }

        if(ctr === 1)  {
          Swall.fire({
            icon: 'success',
            title: 'Profile has been successfully updated',
            timer: 1500
          });
       }
      });

    } else {
      Swall.fire({
        icon: 'error',
        title: 'Invalid Form!',
        text: 'Please double check the form.',
      });
    }
  }
}
