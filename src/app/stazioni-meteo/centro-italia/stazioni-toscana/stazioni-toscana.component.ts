import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-toscana',
  templateUrl: './stazioni-toscana.component.html',
  styleUrls: ['./stazioni-toscana.component.css']
})
export class StazioniToscanaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Toscana  - Meteo Campoli';
    this.description = 'Tutte le stazioni della toscana visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature toscana, meteo campoli toscana, temperature toscana meteo campoli, temperature stazioni meteo toscana, stazioni meteo toscana, stazioni meteo toscana meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/toscana';
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
