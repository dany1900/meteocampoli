import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-puglia',
  templateUrl: './stazioni-puglia.component.html',
  styleUrls: ['./stazioni-puglia.component.css']
})
export class StazioniPugliaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Puglia  - Meteo Campoli';
    this.description = 'Tutte le stazioni della puglia visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature puglia, meteo campoli puglia, temperature puglia meteo campoli, temperature stazioni meteo puglia, stazioni meteo puglia, stazioni meteo puglia meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/puglia';
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
