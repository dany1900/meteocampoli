import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from '../../../webcam.component';

@Component({
  selector: 'webcam-pisa',
  templateUrl: './webcam-pisa.component.html',
  styleUrls: ['./webcam-pisa.component.css']
})
export class WebcamPisaComponent extends WebcamComponent implements OnInit {
}
