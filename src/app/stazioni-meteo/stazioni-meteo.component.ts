import {Component, OnInit} from '@angular/core';
import {SEOService} from '../service/seoservice.service';

@Component({
  selector: 'stazioni-meteo',
  templateUrl: './stazioni-meteo.component.html',
  styleUrls: ['./stazioni-meteo.component.css']
})
export class StazioniMeteoComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService) {
    this.title = 'Stazioni Meteo Limitrofe - Dati - Meteo Campoli';
    this.description = 'Tutte le stazioni del centro italia  visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature limitrofe, meteo campoli temperature, temperature lazio, temperature campoli, temperature stazioni meteo, stazioni meteo centro italia,dati stazioni meteo';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/lazio';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
  }

}
