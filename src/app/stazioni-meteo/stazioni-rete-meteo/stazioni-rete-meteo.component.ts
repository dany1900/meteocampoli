import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'stazioni-rete-meteo',
  templateUrl: './stazioni-rete-meteo.component.html',
  styleUrls: ['./stazioni-rete-meteo.component.css']
})
export class StazioniReteMeteoComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Stazioni Meteo Rete Meteo - Dati - Meteo Campoli';
    this.description = 'Tutte le stazioni meteo italiane visualizzabili. Mappa del sito Rete Meteo direttamente incorporata nella pagina web. Possibilita di accedere a tutti i dati in tempo reale.';
    this.keywords = 'temperature rete meteo,rete meteo meteo campoli, temperature meteo campoli, stazioni meteo nazionali, stazioni meteo nazionai meteo campoli, mappa stazioni meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/stazioni-meteo/rete-meteo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.meteonetwork-sticker');
    el.scrollIntoView();
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
