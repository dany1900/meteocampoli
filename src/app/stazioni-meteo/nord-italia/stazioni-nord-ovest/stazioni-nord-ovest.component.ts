import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-nord-ovest',
  templateUrl: './stazioni-nord-ovest.component.html',
  styleUrls: ['./stazioni-nord-ovest.component.css']
})
export class StazioniNordOvestComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Nord Ovest - Dati';
    this.description = 'Tutte le stazioni del Nord Ovest visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'temperature Nord Ovest, meteo campoli Nord Ovest, temperature Nord Ovest meteo campoli, temperature stazioni meteo Nord Ovest, stazioni meteo Nord Ovest, stazioni meteo Nord Ovest meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/nord-ovest';
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
