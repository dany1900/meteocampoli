import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'webcam-sicilia',
  templateUrl: './webcam-sicilia.component.html',
  styleUrls: ['./webcam-sicilia.component.css']
})
export class WebcamSiciliaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(protected router: Router, public utilityService: UtiliyService) {
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
