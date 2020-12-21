import { Component, OnInit } from '@angular/core';
import Swall from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { Store } from '@ngxs/store';
import { GetTickets } from '../../states/tickets.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  title = 'Tickets';
  tRecords: any;
  isLogged: any;
  tickets: any = [];

  constructor(
    private _globalService: GlobalService,
    private _store: Store,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this._globalService.setPageTitle('Tickets');

    this.tRecords = 0;
    this.isLogged = this._globalService.getLogStatus();

    if(!this.isLogged) {
      Swall.fire({
        icon: 'error',
        title: 'An Error Occured',
        text: 'Unauthorized access!'
      });

      this._route.navigate(['/']);
    }
    
    this._store.dispatch( new GetTickets());
    this._store.subscribe((response: any) => {
      if(response.tickets.tickets) {
        this.tickets  = response.tickets.tickets;
        this.tRecords = Object.keys(response.tickets.tickets).length;
      }
    });

  }

}
