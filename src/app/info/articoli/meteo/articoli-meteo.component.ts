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
    this.title = 'Curiosità Metereologia - Articoli - Meteo Campoli';
    this.description = 'Articoli sul fenomeno della metereologia , tutte le curiosità in continuo aggiornamento';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/meteo';
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
