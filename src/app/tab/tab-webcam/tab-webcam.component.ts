import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'tab-webcam',
  templateUrl: './tab-webcam.component.html',
  styleUrls: ['./tab-webcam.component.css']
})
export class TabWebcamComponent implements OnInit {

   id : number;
  private path: any;


  constructor(private route : ActivatedRoute) {


    let paramTab: any;
    this.path = this.route.url;
    paramTab = this.path._value[0].path;

    switch (paramTab) {
      case "lazio":
        this.id = 0;
        break;
      case "abruzzo":
        this.id = 1;
        break;
      case "molise":
        this.id = 2;
        break;
      case "umbro-marchigiane":
        this.id = 3;
        break;
      default:
        this.id = 0;

        break;

    }

  }

  ngOnInit() {
  }

}
