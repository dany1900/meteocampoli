import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'tab-immaggini-webcam',
  templateUrl: './tab-immaggini-webcam.component.html',
  styleUrls: ['./tab-immaggini-webcam.component.css']
})
export class TabImmagginiWebcamComponent implements OnInit {

  private id : number;
  private path: any;


  constructor(private route : ActivatedRoute) {


    let paramTab: any;
    this.path = this.route.url;
    paramTab = this.path._value[1].path;

    switch (paramTab) {
      case "immagini":
        this.id = 0;
        break;
      case "montagna":
        this.id = 1;
        break;
      case "limitrofe":
        this.id = 2;
        break;
      default:
        this.id = 0;

        break;

    }

  }

  ngOnInit() {
  }

}
