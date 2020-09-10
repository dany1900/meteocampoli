import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'effemeridi',
  templateUrl: './effemeridi.component.html',
  styleUrls: ['./effemeridi.component.css']
})
export class EffemeridiComponent implements OnInit, AfterViewInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Orari Alba Tramonto - Meteo Campoli';
    this.description = 'Orari di alba e tramonto dettagliati di Campoli Appennino. Informazioni relative alla durata dei giorni per ogni mese, informazioni sulla posizione geografica con coordinate';
    this.keywords = '';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/effemeridi';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('.title-micro-section');
    el.scrollIntoView();
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngAfterViewInit() {
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
