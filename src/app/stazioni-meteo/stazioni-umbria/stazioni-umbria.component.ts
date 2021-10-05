import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'stazioni-umbria',
  templateUrl: './stazioni-umbria.component.html',
  styleUrls: ['./stazioni-umbria.component.css']
})
export class StazioniUmbriaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Umbria - Dati - Meteo Campoli';
    this.description = 'Tutte le stazioni del molise visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'temperature umbria, meteo campoli umbria, temperature umbria meteo campoli, temperature stazioni meteo umbria, stazioni meteo umbria, stazioni meteo umbria meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/umbria';
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
