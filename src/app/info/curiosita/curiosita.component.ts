import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'curiosita',
  templateUrl: './curiosita.component.html',
  styleUrls: ['./curiosita.component.css']
})
export class CuriositaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Curiosita - Meteo Campoli';
    this.description = 'Curiosità varie sulla metereoogia. Compreso di monitoraggio qualità dell aria, descrizione estremi meteo ed anomalie pioggia.';
    this.keywords = 'curiosita campoli, curiosita meteo campoli, info e curiosita meteo campoli, monitor sole meteo campoli, qualita aria campoli appennino, qualita aria meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/curiosita';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('.article-header');
    el.scrollIntoView();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
