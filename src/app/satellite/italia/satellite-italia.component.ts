import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'satellite-italia',
  templateUrl: './satellite-italia.component.html',
  styleUrls: ['./satellite-italia.component.css']
})
export class SatelliteItaliaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;

  // tslint:disable-next-line:max-line-length
  constructor(private seo: SEOService, public utilityService: UtiliyService) {
    this.title = 'Radar Precipitazioni Italia';
    this.description = 'Satellite infrarossi, meteosat, fulminazioni e sinottica italia. Radar dettagliato delle precipitazioni in tempo reale.';
    this.keywords = 'satellite italia meteo campoli, radar italia meteo campoli, radar precipitazioni italia  meteo campoli, radar fulmini  italia, radar precipitazioni zoom  italia, radar pioggia italia, satellite italia';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/italia';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.preventCache = Math.random();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }


}
