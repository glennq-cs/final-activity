  export class GetProfile {
    static readonly type = '[Profile] Get Profile';
    constructor(public profile: any) {}
  }
  export class CreateProfile {
    static readonly type = '[Profile] Create Profile';
    constructor(public profile: any) {}
  }
  export class UpdateProfile {
    static readonly type = '[Profile] Edit Profile';
    constructor(public profile: any) {}
  }
  export class DeleteProfile {
    static readonly type = '[Profile] Delete Profile';
    constructor(public profile: any) {}
  }
  export class RefreshProfile {
    static readonly type = '[Profile] Refresh Profile';
    constructor() {}
  }
  export class ProfileStateModel {
    profile: any;
  }
  