import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TicketInfoComponent } from './pages/ticket-info/ticket-info.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoggedInComponent } from './pages/logged-in/logged-in.component';
import { TwoColumnComponent } from './two-column/two-column.component';

const routes: Routes = [
  { path: '', component: TwoColumnComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'tickets', component: TicketsComponent },
    { path: 'ticket-info/:id', component: TicketInfoComponent },
  ] },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'logged-in', component: LoggedInComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
