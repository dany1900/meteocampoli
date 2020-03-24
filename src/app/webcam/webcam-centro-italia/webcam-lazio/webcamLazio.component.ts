import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from '../../webcam.component';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'webcam-lazio',
  templateUrl: './webcamLazio.html',
  styleUrls: ['./webcamLazio.css']
})
export class WebcamLazioComponent extends WebcamComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Tutte le Webcam del lazio montano ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'webcam montagna lazio, webcam centro italia montagna, webcam lazio, webcam meteo campoli lazio, webcam meteo campoli lazio montagna,webcam campocatino'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'WebCam Lazio Montagna - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le Webcam del lazio montano ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/webcam/montagna/lazio'});
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
