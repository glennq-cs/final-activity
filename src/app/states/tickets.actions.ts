export class GetTickets {
    static readonly type = '[Tickets] Get Tickets';
    constructor() {}
}

export class GetTicket {
    static readonly type = '[Tickets] Get Tickets';
    constructor(public ticketId: any) {}
}

export class SetTickets {
    static readonly type = '[Tickets] Set Tickets';
    constructor(public tickets: any) {}
}

export class SetTicket {
    static readonly type = '[Tickets] Set Tickets';
    constructor(public ticket: any) {}
}

export class TicketsStateModel {
    tickets: any;
    ticket: any;
}
