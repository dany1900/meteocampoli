import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'stazioni-molise',
  templateUrl: './stazioni-molise.component.html',
  styleUrls: ['./stazioni-molise.component.css']
})
export class StazioniMoliseComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Tutte le stazioni del molise visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'temperature abruzzo, meteo campoli abruzzo, temperature abruzzo meteo campoli, temperature stazioni meteo abruzzo, stazioni meteo abruzzo, stazioni meteo abruzzo meteo campoli'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Stazioni Meteo Molise  - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le stazioni del molise visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/stazioni-meteo/molise'});
    this.meta.updateTag({property: 'og:site_name', content: 'Meteo Campoli'});
    this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
