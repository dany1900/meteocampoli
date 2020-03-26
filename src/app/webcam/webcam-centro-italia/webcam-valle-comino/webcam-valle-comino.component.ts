import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from '../../webcam.component';

@Component({
  selector: 'webcam-valle-comino',
  templateUrl: './webcam-valle-comino.component.html',
  styleUrls: ['./webcam-valle-comino.component.css']
})
export class WebcamValleCominoComponent extends WebcamComponent implements OnInit {

  constructor() {

    super();

  }

  ngOnInit() {
  }

}
