import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'radio-sondaggi',
  templateUrl: './radio-sondaggi.component.html',
  styleUrls: ['./radio-sondaggi.component.css']
})
export class RadioSondaggiComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  year: number;
  month: string;
  day: string;
  link: string;


  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'RadioSondaggi - Meteo Campoli';
    this.description = 'Radio Sondaggi Europa. Riepilogo dettagliato del radiosondaggio di pratica di mare. Link al riepilogo di tutti i sistemi di rilevazione.';
    this.keywords = 'radiosondaggio meteo campoli, radiosondaggio pratica di mare, radiosondaggio, radiosondaggio italia, radiosondaggio europa, radiosondaggi';
    this.ogUrl = 'www.meteocampoli.altervista.org/dati-attuali/radio-sondaggi';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.calculateDate();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
  }

  calculateDate() {
    // tslint:disable-next-line:no-console
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth().toString() + 1;
    this.day = String(today.getDate()).padStart(2, '0');
    this.link = 'http://weather.uwyo.edu/cgi-bin/sounding?region=europe&TYPE=TEXT%3ALIST&YEAR=' + this.year + '&MONTH=' + this.month + '&FROM=' + this.day + 12 + '&TO=' + this.day + 12 + '&STNM=16245';
    console.info(this.link);
  }

}
