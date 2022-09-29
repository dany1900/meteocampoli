import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-calabria',
  templateUrl: './stazioni-calabria.component.html',
  styleUrls: ['./stazioni-calabria.component.css']
})
export class StazioniCalabriaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Calabria  - Meteo Campoli';
    this.description = 'Tutte le stazioni della calabria visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature calabria, meteo campoli calabria, temperature calabria meteo campoli, temperature stazioni meteo calabria, stazioni meteo calabria, stazioni meteo calabria meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/calabria';
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
