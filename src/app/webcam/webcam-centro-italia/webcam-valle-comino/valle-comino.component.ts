import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from '../../webcam.component';

@Component({
  selector: 'web-valle-comino',
  templateUrl: './valle-comino.component.html',
  styleUrls: ['./valle-comino.component.css']
})
export class ValleCominoComponent extends WebcamComponent implements OnInit {

  constructor() {

    super();

  }

  ngOnInit() {
  }

}
