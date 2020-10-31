import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {SEOService} from '../../service/seoservice.service';

@Component({
  selector: 'satellite-centro',
  templateUrl: './satellite-centro.component.html',
  styleUrls: ['./satellite-centro.component.css']
})
export class SatelliteCentroComponent implements OnInit {

  imageLoader = true;
  imageLoaderMovimento = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  urlSatellite: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Satellite Centro Italia - Radar Precipitazioni  - Meteo Campoli';
    this.description = 'Satellite infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale. Focus sul centro italia.';
    this.keywords = 'satellite centro meteo campoli, radar centro meteo campoli, radar precipitazioni centro italia meteo campoli, radar fulmini centro italia, radar precipitazioni zoom centro italia, radar pioggia centro italia, satellite centro italia, radar pioggie toscana';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite-generale';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.title-info');
    el.scrollIntoView(true);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  errorHandler() {
    this.urlSatellite = './assets/img/webcam-offline.png';
  }

}
