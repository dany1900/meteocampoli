import {Component, OnInit} from '@angular/core';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'webcam-frosinone',
  templateUrl: './webcam-frosinone.component.html',
  styleUrls: ['./webcam-frosinone.component.css']
})
export class WebcamFrosinoneComponent implements OnInit {

  constructor(public utilityService: UtiliyService) {
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

}
