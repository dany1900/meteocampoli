import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'webcam-molise',
  templateUrl: './webcam-molise.component.html',
  styleUrls: ['./webcam-molise.component.css']
})
export class WebcamMoliseComponent implements OnInit {

  constructor(private meta: Meta, private titleService: Title) {
    titleService.setTitle('WebCam Molise Montagna - Meteo Campoli');
    this.meta.updateTag({
      name: 'description',
      content: 'Tutte le stazioni meteo del molise visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'temperature molise, meteo campoli molise, temperature lazio, temperature stazioni meteo molise, stazioni meteo molise'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'WebCam Molise Montagna - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le stazioni meteo del molise visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/webcam/montagna/molise'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'http://meteocampoli.altervista.org'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
