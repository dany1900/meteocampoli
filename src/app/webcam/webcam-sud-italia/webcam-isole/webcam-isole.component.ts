import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'webcam-isole',
  templateUrl: './webcam-isole.component.html',
  styleUrls: ['./webcam-isole.component.css']
})
export class WebcamIsoleComponent implements OnInit {

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
