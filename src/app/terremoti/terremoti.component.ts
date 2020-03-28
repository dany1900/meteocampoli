import {Component, OnInit} from '@angular/core';
import {SEOService} from '../service/seoservice.service';

@Component({
  selector: 'terremoti-info',
  templateUrl: './terremoti.component.html',
  styleUrls: ['./terremoti.component.css']
})
export class TerremotiComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService) {
    this.title = 'Terremoti Informazioni - Meteo Campoli';
    this.description = 'Informazioni generali sui terremoti. Possibilita di accedere a tutte le statistiche mediante indirizzamento. Mappa pericolosità sismica.';
    this.keywords = 'terremoti meteo campoli, lista terremoti, ultimi terremoti campoli, terremoti campoli appennino, ultimo terremoto campoli, lista terremoti campoli appennino,elenco terremoti in italia, lista ultimi terremoti,lista terremoti ingv aggiornata,elenco sismico italiano,iside terremoti,iside lista terremoti,elenco scosse terremoto,terremoti elenco,ingv lista terremoti iside,meteo terremoti altervista,istituto nazionale geofisica e vulcanologia lista terremoti,lista terremoti italia,elenco terremoti italia,elenco terremoti,lista terremoti qualsiasi magnitudo,bollettino terremoti';
    this.ogUrl = 'www.meteocampoli.altervista.org/terremoti';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
  }

}
