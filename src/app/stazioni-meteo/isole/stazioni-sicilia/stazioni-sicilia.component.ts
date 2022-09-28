import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-sicilia',
  templateUrl: './stazioni-sicilia.component.html',
  styleUrls: ['./stazioni-sicilia.component.css']
})
export class StazioniSiciliaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Sicilia  - Dati';
    this.description = 'Tutte le stazioni della sicilia  visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'temperature sicilia , meteo campoli sicilia , temperature Sicilia  meteo campoli, temperature stazioni meteo sicilia , stazioni meteo sicilia , stazioni meteo Sicilia  meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/sicilia ';
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
