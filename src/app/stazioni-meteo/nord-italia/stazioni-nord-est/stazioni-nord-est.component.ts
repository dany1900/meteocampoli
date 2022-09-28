import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-nord-est',
  templateUrl: './stazioni-nord-est.component.html',
  styleUrls: ['./stazioni-nord-est.component.css']
})
export class StazioniNordEstComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Nord Est - Dati';
    this.description = 'Tutte le stazioni del nord est visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'temperature nord est, meteo campoli nord est, temperature nord est meteo campoli, temperature stazioni meteo nord est, stazioni meteo nord est, stazioni meteo nord est meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/nord-est';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.preventCache = Math.random();

  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

}
