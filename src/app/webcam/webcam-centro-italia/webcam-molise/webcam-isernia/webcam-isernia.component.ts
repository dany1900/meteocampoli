import {Component, OnInit} from '@angular/core';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'webcam-isernia',
  templateUrl: './webcam-isernia.component.html',
  styleUrls: ['./webcam-isernia.component.css']
})
export class WebcamIserniaComponent implements OnInit {

  imageLoader = true;

  constructor(public utilityService: UtiliyService) {
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

}
