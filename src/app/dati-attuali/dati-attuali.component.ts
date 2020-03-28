import {Component, OnDestroy, OnInit} from '@angular/core';
import {SEOService} from '../service/seoservice.service';


@Component({
  selector: 'dati-attuali',
  templateUrl: './dati-attuali.component.html',
  styleUrls: ['./dati-attuali.component.css']
})
export class DatiAttualiComponent implements OnInit, OnDestroy {

  path: string;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService) {
    this.path = 'http://meteocampoliappennino.altervista.org/grafico.png?' + Math.random();
    this.title = 'Meteo Campoli - Monitoraggio Meteo';
    this.description = 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.';
    this.keywords = 'Previsioni meteo campoli, stazione meteo campoli, Dati attuali campoli, temperature stazioni meteo, stazioni meteo centro italia, Stazione campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/dati-attuali';
    this.ogImage = 'http://meteocampoli.altervista.org/images/meteocampoli.jpg';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }


}
