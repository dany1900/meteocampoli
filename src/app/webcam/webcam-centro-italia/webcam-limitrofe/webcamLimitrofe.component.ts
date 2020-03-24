import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from '../../webcam.component';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'webcam-limitrofe',
  templateUrl: './webcamLimitrofe.component.html',
  styleUrls: ['./webcamLimitrofe.component.css']
})
export class WebCamLimitrofeComponent extends WebcamComponent implements OnInit {

  imageLoader = true;


  constructor(private meta: Meta) {
    super();
    this.meta.updateTag({
      name: 'description',
      content: 'Webcam della valle di comino e del centro italia montano ordinate per regione e localita. Descrizione e altitudine facilmente visualizzabili. Focus sul Lazio e Abruzzo.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'webcam, webcam limitrofe, webcam lazio, webcam pianura, webcam meteo campoli, webcam valle di comino, webcam valle di comino meteo campoli,webcam atina,monte comino webcam,picinisco webcam'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Webcam Valle di Comino - Frosinone - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Webcam della valle di comino e del centro italia montano ordinate per regione e localita. Descrizione e altitudine facilmente visualizzabili. Focus sul Lazio e Abruzzo.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/webcam/limitrofe'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'http://meteocampoli.altervista.org'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }


}
