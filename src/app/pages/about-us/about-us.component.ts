import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private _globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    this._globalService.setPageTitle('About US');
  }

}
