import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Rx";


@Component({
  selector: 'tab-satellite',
  templateUrl: './tab-satellite.component.html',
  styleUrls: ['./tab-satellite.component.css']
})
export class TabSatelliteComponent  {



  private id : number;
  private path: any;


  constructor(private route : ActivatedRoute) {


    let paramTab: any;
    this.path = this.route.url;
    paramTab = this.path._value[1].path;

    switch (paramTab) {
      case "generale":
        this.id = 0;
        break;
      case "centro-italia":
        this.id = 1;
        break;
      case "nord-italia":
        this.id = 2;
        break;
      case "sud-italia":
        this.id = 3;
        break;
      default:
        this.id = 0;

        break;

    }

  }


}


