import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'stazioni-marche',
  templateUrl: './stazioni-marche.component.html',
  styleUrls: ['./stazioni-marche.component.css']
})
export class StazioniMarcheComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Marche - Dati - Meteo Campoli';
    this.description = 'Tutte le stazioni del molise visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'temperature Marche, meteo campoli Marche, temperature Marche meteo campoli, temperature stazioni meteo Marche, stazioni meteo Marche, stazioni meteo Marche meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/marche';
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
