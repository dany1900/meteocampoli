import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'webcam-sardegna',
  templateUrl: './webcam-sardegna.component.html',
  styleUrls: ['./webcam-sardegna.component.css']
})
export class WebcamSardegnaComponent implements OnInit {

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
