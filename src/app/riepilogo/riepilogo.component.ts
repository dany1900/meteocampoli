import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.css']
})

export class RiepilogoComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'keyword',
      content: 'statistiche stazione meteo campoli, riepilogo stazione meteo campoli, statistiche meteo campoli, riepilogo dati stazione meteo campoli, Stazione meteo campoli appennino'
    });
    this.meta.updateTag({
      name: 'description',
      content: 'Statistiche complessive della stazione meteo di Campoli Appennino posta a 500mt. Completo di tutti i dati giornalieri,mensili,annuali e grafici.'
    });
    this.meta.updateTag({property: 'og:title', content: 'Statistiche Stazione Meteo Campoli - Riepilogo Dati'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Statistiche complessive della stazione meteo di Campoli Appennino posta a 500mt. Completo di tutti i dati giornalieri,mensili,annuali e grafici.'
    });
    this.meta.updateTag({property: 'og:url', content: 'http://meteocampoli.altervista.org/riepilogo'});
    this.meta.updateTag({property: 'og:site_name', content: 'Statistiche Stazione Meteo Campoli - Riepilogo Dati'});
    this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit() {
  }
}
