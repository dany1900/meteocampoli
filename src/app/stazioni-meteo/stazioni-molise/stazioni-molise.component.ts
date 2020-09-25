import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'stazioni-molise',
  templateUrl: './stazioni-molise.component.html',
  styleUrls: ['./stazioni-molise.component.css']
})
export class StazioniMoliseComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Stazioni Meteo Molise - Dati - Meteo Campoli';
    this.description = 'Tutte le stazioni del molise visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'temperature abruzzo, meteo campoli abruzzo, temperature abruzzo meteo campoli, temperature stazioni meteo abruzzo, stazioni meteo abruzzo, stazioni meteo abruzzo meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/molise';
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
