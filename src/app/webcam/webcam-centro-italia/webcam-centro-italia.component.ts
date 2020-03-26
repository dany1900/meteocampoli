import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from '../webcam.component';

@Component({
  selector: 'webcam-centro-italia',
  templateUrl: './webcam-centro-italia.component.html',
  styleUrls: ['./webcam-centro-italia.component.css']
})
export class WebcamCentroItaliaComponent extends WebcamComponent implements OnInit {

  constructor() {

    super();
  }

  ngOnInit() {
  }

}
