import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from '../../webcam.component';

@Component({
  selector: 'webcam-lazio',
  templateUrl: './webcamLazio.html',
  styleUrls: ['./webcamLazio.css']
})
export class WebcamLazioComponent extends WebcamComponent implements OnInit {

  constructor() {

    super();
  }

  ngOnInit() {
  }

}
