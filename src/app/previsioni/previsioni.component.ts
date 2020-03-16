import {Component, OnInit} from '@angular/core';
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-previsioni',
  templateUrl: './previsioni.component.html',
  styleUrls: ['./previsioni.component.css']
})
export class PrevisioniComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'title', content: 'Previsioni Meteo - Monitoraggio Indici Climatici - Meteo Campoli'},
      {
        name: 'description',
        content: 'Previsioni meteo dettagliate locali e nazionali. Monitoraggio degli indici climatici. Analisi radio sondaggi e meteogrammi con tendenza a lungo termine. '
      },
      {
        name: 'keywords',
        content: 'Previsioni meteo campoli, indice NOA, Indici climatici, Tendenza meteo, previsioni meteo campoli appennino'
      },
      {property: 'og:locale', content: 'it_IT'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Previsioni Meteo - Meteogrammi - Monitoraggio Indici Climatici - Meteo Campoli'},
      {
        property: 'og:description',
        content: 'Previsioni meteo dettagliate locali e nazionali. Monitoraggio degli indici climatici. Analisi radio sondaggi e meteogrammi con tendenza a lungo termine.'
      },
      {property: 'og:url', content: 'www.meteocampoli.altervista.org/previsioni'},
      {property: 'og:site_name', content: 'Previsioni Meteo - Monitoraggio Indici Climatici - Meteo Campoli'},
      {property: 'og:image', content: ''}
    ]);
  }

  ngOnInit() {
  }

}
