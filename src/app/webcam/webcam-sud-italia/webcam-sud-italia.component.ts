import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'webcam-sud-italia',
  templateUrl: './webcam-sud-italia.component.html',
  styleUrls: ['./webcam-sud-italia.component.css']
})
export class WebcamSudItaliaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    // TODO
    this.title = 'Meteo Campoli - Monitoraggio Meteo';
    this.description = 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.';
    this.keywords = 'Previsioni meteo campoli, stazione meteo campoli, Dati attuali campoli, temperature stazioni meteo, stazioni meteo centro italia, Stazione campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/dati-attuali';
    this.ogImage = 'http://meteocampoli.altervista.org/images/meteocampoli.jpg';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.title-micro-section');
    if (el.scrollIntoViewIfNeeded) {
      el.scrollIntoViewIfNeeded();
    } else {
      el.scrollIntoView();
    }
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
