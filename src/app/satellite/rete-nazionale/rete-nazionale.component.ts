import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'satellite-rete-nazionale',
  templateUrl: './rete-nazionale.component.html',
  styleUrls: ['./rete-nazionale.component.css']
})
export class ReteNazionaleComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta) {
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
    this.meta.updateTag({property: 'og:title', content: 'Rete Meteo  - Mappa Stazioni Meteo  - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tutte le stazioni meteo italiane visualizzabili. Mappa del sito Rete Meteo direttamente incorporata nella pagina web. Possibilita di accedere a tutti i dati in tempo reale.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/satellite/rete-meteo'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Meteo Campoli'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit(): void {
  }

}
