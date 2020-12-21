import { Component, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Tickets';

  isLogged: any;

  constructor(
    private _store: Store,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._store.subscribe((status: any) => {
        this.isLogged = status.auth.logged;
        if(status.auth.logged === false) {
          this.router.navigate(['/logged-in']);  
        }
      }
    );
  }
}
