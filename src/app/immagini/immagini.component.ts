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
    this.meta.updateTag({
      name: 'description',
      content: 'Immagini di Campoli Appennino, paese della Valle di Comino. Tutte le Webcam del centro italia montano e limitrofe, ordinate per regione e localita.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'immagini meteo campoli, immagini campoli, immagini stazioni meteo campoli, meteo campoli images, immagini e webcam meteo campoli, webcam meteo campoli'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Immagini e WebCam - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Immagini di Campoli Appennino, paese della Valle di Comino. Tutte le Webcam del centro italia montano e limitrofe, ordinate per regione e localita.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/webcam/immagini'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'http://meteocampoli.altervista.org'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});

    super();
  }

  ngOnInit() {
  }

}
