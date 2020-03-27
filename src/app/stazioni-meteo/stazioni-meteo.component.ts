import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'stazioni-meteo',
  templateUrl: './stazioni-meteo.component.html',
  styleUrls: ['./stazioni-meteo.component.css']
})
export class StazioniMeteoComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta, private titleService: Title) {
    titleService.setTitle('Stazioni Meteo Limitrofe - Dati - Meteo Campoli');
    this.meta.updateTag({
      name: 'description',
      content: 'Tutte le stazioni del centro italia  visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'temperature limitrofe, meteo campoli temperature, temperature lazio, temperature campoli, temperature stazioni meteo, stazioni meteo centro italia,dati stazioni meteo'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Stazioni Meteo Generali - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le stazioni del centro italia  visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/stazioni-meteo/lazio'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Meteo Campoli'
    });
    this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
