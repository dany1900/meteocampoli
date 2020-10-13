import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {SEOService} from '../../../../service/seoservice.service';

@Component({
  selector: 'ulivi',
  templateUrl: './ulivi.component.html',
  styleUrls: ['./ulivi.component.css']
})
export class UliviComponent implements OnInit, OnChanges {


  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private myElement: ElementRef, protected router: Router, private scroll: ViewportScroller, private seo: SEOService) {
    this.title = 'Informazioni Ulivo - Articoli - Meteo Campoli';
    this.description = 'Informazioni generali sulla pianta dell ulivo. Ciclo di maturazione, quando  e come preparare il terreno, tutti gli accorgimento necessari per la potatura';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/giardinaggio/ulivi';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }


  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('.title-micro-section');
    if (el.scrollIntoViewIfNeeded) {
      el.scrollIntoViewIfNeeded();
    } else {
      el.scrollIntoView();
    }
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnChanges() {
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }


}
