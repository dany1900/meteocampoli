import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../service/header.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerData: string;


  constructor(private serviceHeader: HeaderService) {
    this.headerData = this.serviceHeader.valueUrl;
  }


  ngOnInit() {
  }

}
