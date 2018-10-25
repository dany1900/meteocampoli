import { Component, OnInit } from '@angular/core';
import {SEOService} from "../service/seoservice.service";
import { Meta } from '@angular/platform-browser';



@Component({
  selector: 'app-dati-attuali',
  templateUrl: './dati-attuali.component.html',
  styleUrls: ['./dati-attuali.component.css']
})
export class DatiAttualiComponent  implements OnInit {

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'title', content: 'Meteo Campoli - Monitoraggio Meteo'},
      {name: 'description', content: 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.'},
      {name: 'keywords', content: 'Previsioni meteo campoli, stazione meteo campoli, Dati attuali campoli, temperature stazioni meteo, stazioni meteo centro italia, Stazione campoli appennino'},
      {httpEquiv: 'Refresh', content: '', url: 'http://meteocampoli.altervista.org/index.htm'},
      {httpEquiv: 'Cache', content: 'no-cache'},
      {httpEquiv: 'Pragma-Control', content: 'no-cache'},
      {httpEquiv: 'Cache-directive', content: 'no-cache'},
      {httpEquiv: 'Pragma-directive', content: 'no-cache'},
      {httpEquiv: 'Cache-Control', content: 'no-cache'},
      {httpEquiv: 'Pragma', content: 'no-cache'},
      {httpEquiv: 'Expires', content: '0'},
      {httpEquiv: 'Pragma-directive', content: 'no-cache'},
      {property: 'og:locale', content: 'it_IT'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Meteo Campoli - Monitoraggio Meteo'},
      {property: 'og:description', content: 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.'},
      {property: 'og:url', content: 'www.meteocampoli.altervista.org'},
      {property: 'og:site_name', content: 'Meteo Campoli - Il sito di Monitoraggio Meteo  - Completo di Mappe,Radar,WebCam'},
      {property: 'og:image', content: 'http://meteocampoli.altervista.org/images/meteocampoli.jpg'}
    ]);
  }

  ngOnInit() {


  }

}
