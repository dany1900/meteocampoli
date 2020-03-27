import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'webcam-marche',
  templateUrl: './webcam-marche.component.html',
  styleUrls: ['./webcam-marche.component.css']
})
export class WebcamMarcheComponent implements OnInit {

  constructor(private meta: Meta, private titleService: Title) {
    titleService.setTitle('WebCam Marche Montagna - Meteo Campoli');
    /*this.meta.updateTag({
      name: 'description',
      content: 'Tutte le Webcam abruzzesi di montagna ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Focus sull\'appennino con link alle migliori fonti.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'webcam abruzzo, webcam abruzzo meteo campoli, webcam abruzzo montagna, webcam appennino meteo campoli,web cam centro italia montagna,webcam abruzzo montagna,web cam villetta barrea,villetta barrea webcam,webcam barrea,webcam campofelice,webcam avezzano'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'WebCam Abruzzo Montagna - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le Webcam abruzzesi di montagna ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Focus sull\'appennino con link alle migliori fonti.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/webcam/montagna/abruzzo'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'http://meteocampoli.altervista.org'
    });
    this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'}); */
  }

  ngOnInit() {
  }

}
