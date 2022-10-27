import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-sardegna',
  templateUrl: './stazioni-sardegna.component.html',
  styleUrls: ['./stazioni-sardegna.component.css']
})
export class StazioniSardegnaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Sardegna - Dati';
    this.description = 'Tutte le stazioni della sardegna visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'temperature sardegna , meteo campoli sardegna , temperature Sardegna meteo campoli, temperature stazioni meteo sardegna , stazioni meteo sardegna , stazioni meteo Sardegna meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/sardegna';
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
