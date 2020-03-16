import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from "../../webcam.component";


@Component({
  selector: 'webcam-limitrofe',
  templateUrl: './webcamLimitrofe.component.html',
  styleUrls: ['./webcamLimitrofe.component.css']
})
export class WebCamLimitrofeComponent extends WebcamComponent implements OnInit {


  constructor() {
    super();
  }

  ngOnInit() {
  }


}
