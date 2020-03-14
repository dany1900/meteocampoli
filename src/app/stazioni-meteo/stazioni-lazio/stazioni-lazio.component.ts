import { Component, OnInit } from '@angular/core';
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'stazioni-lazio',
  templateUrl: './stazioni-lazio.component.html',
  styleUrls: ['./stazioni-lazio.component.css']
})
export class StazioniLazioComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'Tutte le stazioni del Lazio visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'},
      {name: 'keywords', content: 'temperature lazio, meteo campoli lazio, temperature lazio meteo campoli, temperature stazioni meteo lazio, stazioni meteo lazio, stazioni meteo lazio meteo campoli'},
      {property: 'og:locale', content: 'it_IT'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Stazioni Meteo Lazio - Dati - Meteo Campoli'},
      {property: 'og:description', content: 'Tutte le stazioni del Lazio visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'},
      {property: 'og:url', content: ''},
      {property: 'og:site_name', content: ''},
      {property: 'og:image', content: ''}
    ]);
  }
  ngOnInit() {
  }

}
