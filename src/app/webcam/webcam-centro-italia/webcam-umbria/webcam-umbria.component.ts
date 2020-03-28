import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-umbria',
  templateUrl: './webcam-umbria.component.html',
  styleUrls: ['./webcam-umbria.component.css']
})
export class WebcamUmbriaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService) {
    // TODO
    this.title = 'Meteo Campoli - Monitoraggio Meteo';
    this.description = 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.';
    this.keywords = 'Previsioni meteo campoli, stazione meteo campoli, Dati attuali campoli, temperature stazioni meteo, stazioni meteo centro italia, Stazione campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/dati-attuali';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }
  ngOnInit() {
  }

}
