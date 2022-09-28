import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'stazioni-emilia-romagna',
  templateUrl: './stazioni-emilia-romagna.component.html',
  styleUrls: ['./stazioni-emilia-romagna.component.css']
})
export class StazioniEmiliaRomagnaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stazioni Meteo Emilia Romagna - Dati';
    this.description = 'Tutte le stazioni del Emilia Romagna visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'temperature Emilia Romagna, meteo campoli Emilia Romagna, temperature Emilia Romagna meteo campoli, temperature stazioni meteo Emilia Romagna, stazioni meteo Emilia Romagna, stazioni meteo Emilia Romagna meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/emilia-romagna';
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
