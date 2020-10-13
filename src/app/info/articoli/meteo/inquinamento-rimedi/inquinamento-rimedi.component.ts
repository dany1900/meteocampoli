import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {SEOService} from '../../../../service/seoservice.service';

@Component({
  selector: 'inquinamento-rimedi',
  templateUrl: './inquinamento-rimedi.component.html',
  styleUrls: ['./inquinamento-rimedi.component.css']
})
export class InquinamentoRimediComponent implements OnInit, OnChanges {


  title: string;
  description: string;
  ogUrl: string;
  keywords: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Inquinamento aria - Articoli - Meteo Campoli';
    this.description = 'L\'inquinamento dell\'aria sulle aree notoriamente più soggette sta acquisendo sempre maggior importanza. Un forte contributo arriva direttamente dalle condizioni meteorologiche...';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/giardinaggio/ulivi';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('.header-macro-section');
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
