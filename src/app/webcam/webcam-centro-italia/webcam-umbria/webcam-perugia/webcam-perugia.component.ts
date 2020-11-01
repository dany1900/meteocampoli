import {Component, OnInit} from '@angular/core';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'webcam-perugia',
  templateUrl: './webcam-perugia.component.html',
  styleUrls: ['./webcam-perugia.component.css']
})
export class WebcamPerugiaComponent implements OnInit {

  imageLoader = true;

  constructor(public utilityService: UtiliyService) {
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

}
