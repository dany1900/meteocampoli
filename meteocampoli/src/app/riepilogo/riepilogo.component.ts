import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  //styleUrls: ['./riepilogo.component.css']
})

export class RiepilogoComponent implements OnInit {
  //newcomponent = "Entered in new component created";
  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'Statistiche complessive della stazione meteo di Campoli Appennino posta a 500mt. Completo di tutti i dati giornalieri,mensili,annuali e grafici.'},
      {name: 'keywords', content: 'statistiche stazione meteo campoli, riepilogo stazione meteo campoli, statistiche meteo campoli, riepilogo dati stazione meteo campoli, Stazione meteo campoli appennino'},
      {property: 'og:locale', content: 'it_IT'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Statistiche Stazione Meteo Campoli - Riepilogo Dati'},
      {property: 'og:description', content: 'Statistiche complessive della stazione meteo di Campoli Appennino posta a 500mt. Completo di tutti i dati giornalieri,mensili,annuali e grafici.'},
      {property: 'og:url', content: 'http://meteocampoli.altervista.org/riepilogo.htm'},
      {property: 'og:site_name', content: 'Statistiche Stazione Meteo Campoli - Riepilogo Dati'},
      {property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'}
    ]);
  }


  ngOnInit() { }
}
