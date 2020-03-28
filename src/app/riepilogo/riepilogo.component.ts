import {Component, OnInit} from '@angular/core';
import {SEOService} from '../service/seoservice.service';


@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.css']
})

export class RiepilogoComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService) {
    this.title = 'Statistiche Stazione Meteo Campoli - Riepilogo Dati';
    this.description = 'Statistiche complessive della stazione meteo di Campoli Appennino posta a 500mt. Completo di tutti i dati giornalieri,mensili,annuali e grafici.';
    this.keywords = 'statistiche stazione meteo campoli, riepilogo stazione meteo campoli, statistiche meteo campoli, riepilogo dati stazione meteo campoli, Stazione meteo campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/riepilogo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
  }
}
