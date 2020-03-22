import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'dati-attuali',
  templateUrl: './dati-attuali.component.html',
  styleUrls: ['./dati-attuali.component.css']
})
export class DatiAttualiComponent implements OnInit, OnDestroy {

  path: string;

  constructor(private meta: Meta) {

    let headers = new Headers({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    this.meta.updateTag({
      name: 'keyword',
      content: 'Previsioni meteo campoli, stazione meteo campoli, Dati attuali campoli, temperature stazioni meteo, stazioni meteo centro italia, Stazione campoli appennino'
    });
    this.meta.updateTag({
      name: 'description',
      content: 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.'
    });
    this.meta.updateTag({property: 'og:title', content: 'Meteo Campoli - Monitoraggio Meteo'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Meteo Campoli - Il sito di Monitoraggio Meteo  - Completo di Mappe,Radar,WebCam'
    });
    this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/meteocampoli.jpg'});
    this.path = 'http://meteocampoliappennino.altervista.org/grafico.png';


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
