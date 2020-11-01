import {Component, OnInit} from '@angular/core';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'webcam-pistoia',
  templateUrl: './webcam-pistoia.component.html',
  styleUrls: ['./webcam-pistoia.component.css']
})
export class WebcamPistoiaComponent implements OnInit {

  constructor(public utilityService: UtiliyService) {
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

}
