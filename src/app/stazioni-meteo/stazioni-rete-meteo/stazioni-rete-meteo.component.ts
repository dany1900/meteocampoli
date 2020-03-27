import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'stazioni-rete-meteo',
  templateUrl: './stazioni-rete-meteo.component.html',
  styleUrls: ['./stazioni-rete-meteo.component.css']
})
export class StazioniReteMeteoComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta, private titleService: Title) {
    titleService.setTitle('Stazioni Meteo Rete Meteo - Dati - Meteo Campoli');
    this.meta.updateTag({
      name: 'description',
      content: 'Tutte le stazioni meteo italiane visualizzabili. Mappa del sito Rete Meteo direttamente incorporata nella pagina web. Possibilita di accedere a tutti i dati in tempo reale.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'temperature rete meteo,rete meteo meteo campoli, temperature meteo campoli, stazioni meteo nazionali, stazioni meteo nazionai meteo campoli, mappa stazioni meteo campoli'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Stazioni Meteo Molise  - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le stazioni meteo italiane visualizzabili. Mappa del sito Rete Meteo direttamente incorporata nella pagina web. Possibilita di accedere a tutti i dati in tempo reale.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/stazioni-meteo/rete-meteo'});
    this.meta.updateTag({property: 'og:site_name', content: 'Meteo Campoli'});
    this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }

}
