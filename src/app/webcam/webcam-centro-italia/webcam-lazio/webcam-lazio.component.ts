import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'webcam-lazio',
  templateUrl: './webcam-lazio.html',
  styleUrls: ['./webcam-lazio.css']
})
export class WebcamLazioComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'WebCam Lazio Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam del lazio montano ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.';
    this.keywords = 'webcam montagna lazio, webcam centro italia montagna, webcam lazio, webcam meteo campoli lazio, webcam meteo campoli lazio montagna,webcam campocatino';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/lazio';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
