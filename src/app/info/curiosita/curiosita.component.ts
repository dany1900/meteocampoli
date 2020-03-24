import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'curiosita',
  templateUrl: './curiosita.component.html',
  styleUrls: ['./curiosita.component.css']
})
export class CuriositaComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Monitoraggio del Sole con dati. Analisi e previsioni sulla qualità dell\'aria. Statistiche sulle medie regionali italiane. Effemeridi Campoli App'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'curiosita campoli, curiosita meteo campoli, info e curiosita meteo campoli, monitor sole meteo campoli, qualita aria campoli appennino, qualita aria meteo campoli'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Curiosita - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Monitoraggio del Sole con dati. Analisi e previsioni sulla qualità dell\'aria. Statistiche sulle medie regionali italiane. Effemeridi Campoli App'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/webcam/info/curiosita'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'http://meteocampoli.altervista.org'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});
  }

  ngOnInit(): void {
  }

}
