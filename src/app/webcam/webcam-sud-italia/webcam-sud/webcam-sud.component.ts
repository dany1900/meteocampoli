import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'webcam-sud',
  templateUrl: './webcam-sud.component.html',
  styleUrls: ['./webcam-sud.component.css']
})
export class WebcamSudComponent implements OnInit {

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
