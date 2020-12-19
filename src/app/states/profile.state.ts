import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { ProfileService } from '../services/profile.service';
import {
    ProfileStateModel,
    RefreshProfile,
    UpdateProfile,
    GetProfile } from './profile.actions';

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: null
  }
})
@Injectable()
export class ProfileState {
  constructor(private _profileService: ProfileService) {}

  @Selector()
  static profile(state: ProfileStateModel): any {
    return state.profile;
  }

  @Action(GetProfile)
  getProfile({patchState}: StateContext<ProfileStateModel>): void {
    this._profileService.getProfile().subscribe(
      (response: any) => {
        if(response.status === 'success') {
          patchState({profile: response.data});
        }
      },

      (response: any) => {
        if (response.error) {
          const error = response.error;
          error.code = response.status;

          console.log(error.message);
        }
      }
    );
  }

  @Action(UpdateProfile)
  updateProfile({patchState}: StateContext<ProfileStateModel>, { profile }: UpdateProfile ): void {
    this._profileService.updateProfile(profile).subscribe(
      (response: any) => {
        if(response.status === 'success') {
          patchState({profile: response.data});
        }
      },

      (response: any) => {
        if (response.error) {
          const error = response.error;
          error.code = response.status;

          console.log(error.message);
        }
      }
    );
  }

  @Action(RefreshProfile, { cancelUncompleted: true })
  refreshProfile({ patchState, dispatch }: StateContext<ProfileStateModel>): void {
    this._profileService.test({}).subscribe(
      (response: any) => {
        console.log(response);
      },

      (response: any) => {
        if (response.error) {
          const error = response.error;
          error.code = response.status;

          console.log(error.message);
        }
      }
    );
  }
}
