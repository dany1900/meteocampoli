import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'giardinaggio',
  templateUrl: './giardinaggio.component.html',
  styleUrls: ['./giardinaggio.component.css']
})
export class GiardinaggioComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  isUlivi = false;

  constructor(private seo: SEOService) {
    // TODO
    this.title = 'Giardinaggio - Articoli - Meteo Campoli';
    this.description = 'Monitoraggio del Sole con dati. Analisi e previsioni sulla qualità dell\'aria. Statistiche sulle medie regionali italiane. Effemeridi Campoli App';
    this.keywords = 'curiosita campoli, curiosita meteo campoli, info e curiosita meteo campoli, monitor sole meteo campoli, qualita aria campoli appennino, qualita aria meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/info/curiosita';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit(): void {
  }

}
