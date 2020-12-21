import { Component, OnInit } from '@angular/core';
import Swall from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { Store } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { GetTicket } from '../../states/tickets.actions';


@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.css']
})
export class TicketInfoComponent implements OnInit {

  title = "Ticket";
  isLogged: any;
  ticket: any = {
    template: {
      alias: '',
      name: '',
      serial: ''
    },
    created_at: '',
    priority:'',
    status: '',
    assignee: '',
  };

  constructor(
    private _globalService: GlobalService,
    private _store: Store,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._globalService.setPageTitle('Ticket Info');
    this.isLogged = this._globalService.getLogStatus();

    if(!this.isLogged) {
      Swall.fire({
        icon: 'error',
        title: 'An Error Occured',
        text: 'Unauthorized access!'
      });
    }

    const tid = this._activatedRoute.snapshot.params.id;
    
    this._store.dispatch( new GetTicket(tid));
    this._store.subscribe((response: any) => {
      if(response.tickets.ticket) {
        this.ticket = response.tickets.ticket;        
      }
    });
  }

}
