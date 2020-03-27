import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-previsioni',
  templateUrl: './previsioni.component.html',
  styleUrls: ['./previsioni.component.css']
})
export class PrevisioniComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta, private titleService: Title) {
    titleService.setTitle('Previsioni Meteo - Monitoraggio Indici Climatici - Meteo Campoli');
    this.meta.updateTag({
      name: 'description',
      content: 'Previsioni meteo dettagliate locali e nazionali. Monitoraggio degli indici climatici. Analisi radio sondaggi e meteogrammi con tendenza a lungo termine.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Previsioni meteo campoli, indice NOA, Indici climatici, Tendenza meteo, previsioni meteo campoli appennino'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Previsioni Meteo - Meteogrammi - Monitoraggio Indici Climatici - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Previsioni meteo dettagliate locali e nazionali. Monitoraggio degli indici climatici. Analisi radio sondaggi e meteogrammi con tendenza a lungo termine.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Meteo Campoli'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
