import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    this._globalService.setPageTitle('Home');
  }

}
