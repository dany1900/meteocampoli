import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'stazioni-lazio',
  templateUrl: './stazioni-lazio.component.html',
  styleUrls: ['./stazioni-lazio.component.css']
})
export class StazioniLazioComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta, private titleService: Title) {
    titleService.setTitle('Stazioni Meteo Lazio - Dati - Meteo Campoli');
    this.meta.updateTag({
      name: 'description',
      content: 'Tutte le stazioni del Lazio visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'temperature lazio, meteo campoli lazio, temperature lazio meteo campoli, temperature stazioni meteo lazio, stazioni meteo lazio, stazioni meteo lazio meteo campoli,stazioni meteo lazio'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Stazioni Meteo Lazio - Dati - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le stazioni del Lazio visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/stazioni-meteo/lazio'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Tutte le stazioni del Lazio visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'
    });
    this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
