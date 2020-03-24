import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'webcam-montagna',
  templateUrl: './webcam-montagna.component.html',
  styleUrls: ['./webcam-montagna.component.css']
})
export class WebcamMontagnaComponent implements OnInit {

  footerTitle: any;

  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Tutte le Webcam del centro italia montano ordinate per regione e localita. Descrizione e altitudine facilmente visualizzabili. Focus sulla valle di comino.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'webcam montagna, webcam centro italia, webcam lazio,web cam abruzzo, webcam meteo campoli, webcam campoli, webcam campoli appennino,webcam rivisondoli,webcam passo godi,webcam ovindoli,webcam campotosto,webcam cappadocia'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'WebCam Montagna Centro Italia - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le Webcam del centro italia montano ordinate per regione e localita. Descrizione e altitudine facilmente visualizzabili. Focus sulla valle di comino.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/webcam/montagna'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'http://meteocampoli.altervista.org'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
    this.footerTitle = 'Le immagini sono prese ad intervalli regolari';

  }


}
