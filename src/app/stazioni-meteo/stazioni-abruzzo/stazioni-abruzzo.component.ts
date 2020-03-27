import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'stazioni-abruzzo',
  templateUrl: './stazioni-abruzzo.component.html',
  styleUrls: ['./stazioni-abruzzo.component.css']
})
export class StazioniAbruzzoComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta, private titleService: Title) {
    titleService.setTitle('Stazioni Meteo Abruzzo - Dati - Meteo Campoli');
    this.meta.updateTag({
      name: 'description',
      content: 'Tutte le stazioni del Lazio visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'temperature abruzzo, meteo campoli abruzzo, temperature abruzzo meteo campoli, temperature stazioni meteo abruzzo, stazioni meteo abruzzo, stazioni meteo abruzzo meteo campoli'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Stazioni Meteo Abruzzo  - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le stazioni del\'Abruzzo visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/stazioni-meteo/abruzzo'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Tutte le stazioni del\'Abruzzo visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche. Link ai migliori siti.'
    });
    this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
