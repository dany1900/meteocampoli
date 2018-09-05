import { Component, OnInit } from '@angular/core';
import {WebcamComponent} from "../webcam.component";

@Component({
  selector: 'web-centro-italia',
  templateUrl: './centro-italia.component.html',
  styleUrls: ['./centro-italia.component.css']
})
export class CentroItaliaComponent extends WebcamComponent implements OnInit {

  constructor() {

    super();
  }

  ngOnInit() {
  }

}
