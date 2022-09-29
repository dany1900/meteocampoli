import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-basilicata',
  templateUrl: './stazioni-basilicata.component.html',
  styleUrls: ['./stazioni-basilicata.component.css']
})
export class StazioniBasilicataComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Basilicata  - Meteo Campoli';
    this.description = 'Tutte le stazioni della basilicata visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature basilicata, meteo campoli basilicata, temperature basilicata meteo campoli, temperature stazioni meteo basilicata, stazioni meteo basilicata, stazioni meteo basilicata meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/basilicata';
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
