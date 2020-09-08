import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'webcam-marche',
  templateUrl: './webcam-marche.component.html',
  styleUrls: ['./webcam-marche.component.css']
})
export class WebcamMarcheComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'WebCam Marche Montagna - Meteo Campoli';
    this.description = '';
    this.keywords = '';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/marche';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.center');
    el.scrollIntoView();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
