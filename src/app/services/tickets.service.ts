import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(
    private _requestService: RequestService,
  ) { }

  getTickets(): Observable<any> {
    return this._requestService.getTickets('tickets/my');
  }

  getTicket(id: number): Observable<any> {
    return this._requestService.getTicket('tickets/my/'+id);
  }

}
