import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';

@Component({
  selector: 'stazioni-abruzzo',
  templateUrl: './stazioni-abruzzo.component.html',
  styleUrls: ['./stazioni-abruzzo.component.css']
})
export class StazioniAbruzzoComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService) {
    this.title = 'Stazioni Meteo Abruzzo  - Meteo Campoli';
    this.description = 'Tutte le stazioni del Lazio visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.';
    this.keywords = 'temperature abruzzo, meteo campoli abruzzo, temperature abruzzo meteo campoli, temperature stazioni meteo abruzzo, stazioni meteo abruzzo, stazioni meteo abruzzo meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/abruzzo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
  }

}
