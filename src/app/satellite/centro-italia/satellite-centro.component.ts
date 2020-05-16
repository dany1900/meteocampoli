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

  // TODO
  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Satellite Centro Italia - Radar Precipitazioni  - Meteo Campoli';
    /* this.meta.updateTag({
      name: 'description',
      content: 'Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale. Focus sul centro italia.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Satellite centro meteo campoli, radar centro meteo campoli, radar precipitazioni centro italia meteo campoli, radar fulmini centro italia, radar precipitazioni zoom centro italia, radar pioggia centro italia, satellite centro italia'
    });
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: 'Satellite Centro Italia - Radar Precipitazioni  - Meteo Campoli'});
    this.meta.updateTag({
      property: 'og:description',
      content: 'Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale. Focus sul centro italia.'
    });
    this.meta.updateTag({property: 'og:url', content: 'www.meteocampoli.altervista.org/satellite-centro'});
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Meteo Campoli'
    }); */
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('div');
    el.scrollIntoView();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  errorHandler() {
    this.urlSatellite = './assets/img/webcam-offline.png';
  }

}
