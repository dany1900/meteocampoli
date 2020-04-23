import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'stazioni-generali',
  templateUrl: './stazioni-generali.component.html',
  styleUrls: ['./stazioni-generali.component.css']
})
export class StazioniGeneraliComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Stazioni Meteo Limitrofe - Dati - Meteo Campoli';
    this.description = 'Tutte le stazioni del centro italia  visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature limitrofe, meteo campoli temperature, temperature lazio, temperature campoli, temperature stazioni meteo, stazioni meteo centro italia,dati stazioni meteo';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/lazio';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.meteonetwork-sticker');
    el.scrollIntoView();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
