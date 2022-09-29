import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-campania',
  templateUrl: './stazioni-campania.component.html',
  styleUrls: ['./stazioni-campania.component.css']
})
export class StazioniCampaniaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Campania  - Meteo Campoli';
    this.description = 'Tutte le stazioni della campania visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature campania, meteo campoli campania, temperature campania meteo campoli, temperature stazioni meteo campania, stazioni meteo campania, stazioni meteo campania meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/campania';
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
