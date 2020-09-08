import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'webcam-limitrofe',
  templateUrl: './webcamLimitrofe.component.html',
  styleUrls: ['./webcamLimitrofe.component.css']
})
export class WebCamLimitrofeComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Webcam Valle di Comino - Frosinone - Meteo Campoli';
    this.description = 'Webcam della valle di comino e del centro italia montano ordinate per regione e localita. Descrizione e altitudine facilmente visualizzabili. Focus sul Lazio e Abruzzo.';
    this.keywords = 'webcam, webcam limitrofe, webcam lazio, webcam pianura, webcam meteo campoli, webcam valle di comino, webcam valle di comino meteo campoli,webcam atina,monte comino webcam,picinisco webcam';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/limitrofe';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.title-micro-section');
    el.scrollIntoView();
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }


}
