import {Component, OnInit} from '@angular/core';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'webcam-ascoli',
  templateUrl: './webcam-ascoli.component.html',
  styleUrls: ['./webcam-ascoli.component.css']
})
export class WebcamAscoliComponent implements OnInit {

  constructor(public utilityService: UtiliyService) {
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

}
