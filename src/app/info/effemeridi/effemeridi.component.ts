import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';

@Component({
  selector: 'effemeridi',
  templateUrl: './effemeridi.component.html',
  styleUrls: ['./effemeridi.component.css']
})
export class EffemeridiComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService) {
    this.title = 'Orari Alba Tramonto - Meteo Campoli';
    this.description = 'Monitoraggio del Sole con dati. Analisi e previsioni sulla qualità dell\'aria. Statistiche sulle medie regionali italiane. Effemeridi Campoli App';
    this.keywords = 'curiosita campoli, curiosita meteo campoli, info e curiosita meteo campoli, monitor sole meteo campoli, qualita aria campoli appennino, qualita aria meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/info/effemeridi';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit(): void {
  }

}
