import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-terremoti',
  templateUrl: './terremoti.component.html',
  styleUrls: ['./terremoti.component.css']
})
export class TerremotiComponent implements OnInit {

  imageLoader = true;

  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Riepilogo delle ultime rilevazioni dei terremoti. Possibilita di accedere a tutte le statistiche mediante indirizzamento. Mappa pericolosità sismica. Focus sull\'Italia'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'terremoti meteo campoli, lista terremoti, ultimi terremoti campoli, terremoti campoli appennino, ultimo terremoto campoli, lista terremoti campoli appennino,elenco terremoti in italia, lista ultimi terremoti,lista terremoti ingv aggiornata,elenco sismico italiano,iside terremoti,iside lista terremoti,elenco scosse terremoto,terremoti elenco,ingv lista terremoti iside,meteo terremoti altervista,istituto nazionale geofisica e vulcanologia lista terremoti,lista terremoti italia,elenco terremoti italia,elenco terremoti,lista terremoti qualsiasi magnitudo,bollettino terremoti'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Terremoti Elenco - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Riepilogo delle ultime rilevazioni dei terremoti. Possibilita di accedere a tutte le statistiche mediante indirizzamento. Mappa pericolosità sismica. Focus sull\'Italia'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/webcam/montagna/molise'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'http://meteocampoli.altervista.org'
    });
    //this.meta.updateTag({property: 'og:image', content: 'http://meteocampoli.altervista.org/images/riepilogo.jpg'});

    super();
  }

  ngOnInit() {
  }

}
