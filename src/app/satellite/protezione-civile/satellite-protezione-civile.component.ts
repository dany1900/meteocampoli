import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {ViewportScroller} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'satellite-protezione-civile',
  templateUrl: './satellite-protezione-civile.component.html',
  styleUrls: ['./satellite-protezione-civile.component.css']
})
export class SatelliteProtezioneCivileComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  // tslint:disable-next-line:max-line-length
  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, private spinner: NgxSpinnerService) {
    this.title = 'Satellite Protezione Civile - Radar Precipitazioni  - Meteo Campoli';
    this.description = 'Satellite infrarossi, meteosat, fulminazioni e sinottica relativi al nord italia. Radar dettagliato delle precipitazioni in tempo reale. Focus sul nord italia.';
    this.keywords = 'satellite nord meteo campoli, radar nord meteo campoli, radar precipitazioni nord italia meteo campoli, radar fulmini nord italia, radar precipitazioni zoom nord italia, radar pioggia nord italia, satellite nord italia';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/protezione-civile';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.title-micro-section');
    el.scrollIntoView();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
