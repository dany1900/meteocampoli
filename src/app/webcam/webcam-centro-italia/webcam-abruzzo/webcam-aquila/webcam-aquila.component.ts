import {Component, OnInit} from '@angular/core';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'webcam-aquila',
  templateUrl: './webcam-aquila.component.html',
  styleUrls: ['./webcam-aquila.component.css']
})
export class WebcamAquilaComponent implements OnInit {

  imageLoader = true;

  constructor(public utilityService: UtiliyService) {
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

}
