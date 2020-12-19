import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetTickets, GetTicket, SetTickets, SetTicket, TicketsStateModel } from './tickets.actions'
import { TicketsService } from '../services/tickets.service';
import { dispatch } from 'rxjs/internal/observable/pairs';

@State<TicketsStateModel>({
    name: 'tickets',
    defaults: {
      tickets: null,
      ticket: null
    }
  })
@Injectable()
export class TicketsState {
    constructor(
        private _ticketsService: TicketsService
    ) {}

    @Selector()
    static tickets(state: TicketsStateModel): any {
      return state.tickets;
    }

    @Selector()
    static ticket(state: TicketsStateModel): any {
      return state.ticket;
    }

    @Action(GetTickets)
    getTickets({ dispatch }: StateContext<TicketsStateModel>): void {
        this._ticketsService.getTickets().subscribe(
            (response: any) => {
              if(response.status === 'success') {
                dispatch(new SetTickets(response.data));
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

    @Action(SetTickets)
    setTickets({ patchState }: StateContext<TicketsStateModel>, { tickets }: SetTickets): void {
        patchState({ tickets: tickets });
    }

    @Action(GetTicket)
    getTicket({ dispatch }: StateContext<TicketsStateModel>, { ticketId }: GetTicket): void {
        this._ticketsService.getTicket(ticketId).subscribe(
            (response: any) => {
              if(response.status === 'success') {
                dispatch(new SetTicket(response.data));
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

    @Action(SetTicket)
    setTicket({ patchState }: StateContext<TicketsStateModel>, { ticket }: SetTicket): void {
        patchState({ ticket });
    }
}