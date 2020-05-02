import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'satellite-rete-nazionale',
  templateUrl: './rete-nazionale.component.html',
  styleUrls: ['./rete-nazionale.component.css']
})
export class ReteNazionaleComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller) {
    this.title = 'Rete Meteo  - Mappa Stazioni Meteo  - Meteo Campoli';
    this.description = 'Tutte le stazioni meteo italiane visualizzabili. Mappa del sito Rete Meteo direttamente incorporata nella pagina web. Possibilita di accedere a tutti i dati in tempo reale.';
    this.keywords = 'temperature rete meteo,rete meteo meteo campoli, temperature meteo campoli, stazioni meteo nazionali, stazioni meteo nazionai meteo campoli, mappa stazioni meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/rete-meteo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.header-macro-section');
    el.scrollIntoView();
  }


  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
