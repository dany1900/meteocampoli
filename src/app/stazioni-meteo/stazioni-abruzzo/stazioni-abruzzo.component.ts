import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'stazioni-abruzzo',
  templateUrl: './stazioni-abruzzo.component.html',
  styleUrls: ['./stazioni-abruzzo.component.css']
})
export class StazioniAbruzzoComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Stazioni Meteo Abruzzo  - Meteo Campoli';
    this.description = 'Tutte le stazioni del Lazio visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature abruzzo, meteo campoli abruzzo, temperature abruzzo meteo campoli, temperature stazioni meteo abruzzo, stazioni meteo abruzzo, stazioni meteo abruzzo meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/abruzzo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.scroll-view');
    el.scrollIntoView();
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
