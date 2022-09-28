import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-sud-italia',
  templateUrl: './stazioni-sud-italia.component.html',
  styleUrls: ['./stazioni-sud-italia.component.css']
})
export class StazioniSudItaliaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo sud italia - Dati';
    this.description = 'Tutte le stazioni del sud italia visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'temperature sud italia, meteo campoli sud italia, temperature sud italia meteo campoli, temperature stazioni meteo sud italia, stazioni meteo sud italia, stazioni meteo sud italia meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/sud italia';
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
