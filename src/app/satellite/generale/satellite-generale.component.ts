import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'satellite-generale',
  templateUrl: './satellite-generale.component.html',
  styleUrls: ['./satellite-generale.component.css']
})

export class SatelliteGeneraleComponent implements OnInit {

  imageLoader = true;
  imageLoaderMovimento = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'Satellite Metereologico - Radar Precipitazioni  - Meteo Campoli';
    this.description = 'Monitoraggio completo del meteo. Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale.';
    this.keywords = 'satellite meteo campoli, radar meteo campoli, radar precipitazioni meteo campoli, radar fulmini meteo campoli, radar precipitazioni zoom, radar pioggia meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite-generale';
    this.ogImage = '';
  }


  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('div');
    el.scrollIntoView();
  }


  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
