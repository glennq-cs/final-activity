import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { LoggedInComponent } from './pages/logged-in/logged-in.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TwoColumnComponent } from './two-column/two-column.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthState } from '../app/states/auth.state';
import { ProfileState } from '../app/states/profile.state';
import { TicketsState } from '../app/states/tickets.state';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TicketInfoComponent } from './pages/ticket-info/ticket-info.component';
import { OneColumnComponent } from './one-column/one-column.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    NotFoundComponent,
    AboutUsComponent,
    TicketsComponent,
    LoggedInComponent,
    HomeComponent,
    ProfileComponent,
    SidebarComponent,
    TwoColumnComponent,
    TicketInfoComponent,
    OneColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      AuthState,
      ProfileState,
      TicketsState
    ]),
    NgxsLoggerPluginModule.forRoot({
      disabled: true
    }),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
