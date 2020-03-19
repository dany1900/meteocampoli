import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'immagini',
  templateUrl: './immagini.component.html',
  styleUrls: ['./immagini.component.css']
})
export class ImmaginiComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'title', content: 'Immagini e WebCam - Meteo Campoli'},
      {
        name: 'description',
        content: 'Immagini di Campoli Appennino, paese della Valle di Comino. Tutte le Webcam del centro italia montano e limitrofe, ordinate per regione e localita. '
      },
      {
        name: 'keywords',
        content: 'immagini meteo campoli, immagini campoli, immagini stazioni meteo campoli, meteo campoli images, immagini e webcam meteo campoli, webcam meteo campoli'
      },
      {property: 'og:locale', content: 'it_IT'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Immagini e WebCam - Meteo Campoli'},
      {
        property: 'og:description',
        content: 'Immagini di Campoli Appennino, paese della Valle di Comino. Tutte le Webcam del centro italia montano e limitrofe, ordinate per regione e localita. '
      },
      {property: 'og:url', content: 'www.meteocampoli.altervista.org/immagini'},
      {
        property: 'og:site_name',
        content: 'Meteo Campoli - Il sito di Monitoraggio Meteo  - Completo di Mappe,Radar,WebCam'
      },
      {property: 'og:image', content: 'http://meteocampoli.altervista.org/images/meteocampoli.jpg'}
    ]);
  }

  ngOnInit() {
  }

}
