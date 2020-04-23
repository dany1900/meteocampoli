import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'stazioni-lazio',
  templateUrl: './stazioni-lazio.component.html',
  styleUrls: ['./stazioni-lazio.component.css']
})
export class StazioniLazioComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Stazioni Meteo Lazio - Dati - Meteo Campoli';
    this.description = 'Tutte le stazioni del Lazio visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature lazio, meteo campoli lazio, temperature lazio meteo campoli, temperature stazioni meteo lazio, stazioni meteo lazio, stazioni meteo lazio meteo campoli,stazioni meteo lazio';
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
