import {Component, ElementRef, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'articoli-meteo',
  templateUrl: './articoli-meteo.component.html',
  styleUrls: ['./articoli-meteo.component.css']
})
export class ArticoliMeteoComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller) {
    // TODO
    this.title = 'Articoli - Meteo Campoli';
    this.description = 'Monitoraggio del Sole con dati. Analisi e previsioni sulla qualità dell\'aria. Statistiche sulle medie regionali italiane. Effemeridi Campoli App';
    this.keywords = 'curiosita campoli, curiosita meteo campoli, info e curiosita meteo campoli, monitor sole meteo campoli, qualita aria campoli appennino, qualita aria meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/info/articoli';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('.row');
    el.scrollIntoView();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
