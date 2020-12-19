import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { GetProfile } from '../states/profile.actions';
import { Store } from '@ngxs/store';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  profileBasic: any;
  isLogged: any;

  profile: Profile = {
    name        : '',
    job_title   : '',
    first_name  : '',
    last_name   : '',
    email       : '',
    mobile_number: '',
    username    : '',
    password    : '',
    alias       : 'https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-avatar-icon-png-image_4013749.jpg'
  }

  constructor(
    private _store: Store,
    private _globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.isLogged = this._globalService.getLogStatus();

    if(this.isLogged) {
      this._store.dispatch(new GetProfile(this.profile));
      this._store.subscribe((response: any) => {

        if(response.profile.profile) {
          let profileInfo = response.profile.profile;
          
          this.profile.name      = profileInfo.name;
          this.profile.job_title = profileInfo.meta.job_title;
          this.profile.mobile_number = profileInfo.meta.mobile_number;
          this.profile.alias     = 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg';
        }
      });
    }
  }
}
