import { Component, OnInit } from '@angular/core';
import {WebcamComponent} from "../../../webcam.component";

@Component({
  selector: 'webcam-frosinone',
  templateUrl: './webcam-frosinone.component.html',
  styleUrls: ['./webcam-frosinone.component.css']
})
export class WebcamFrosinoneComponent extends WebcamComponent implements OnInit {

  constructor() {

    super();
  }

  ngOnInit() {
  }

}
