import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'satellite-nord',
  templateUrl: './satellite-nord.component.html',
  styleUrls: ['./satellite-nord.component.css']
})
export class SatelliteNordComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, public utilityService: UtiliyService) {
    this.title = 'Satellite Nord Italia - Radar Precipitazioni  - Meteo Campoli';
    this.description = 'Satellite infrarossi, meteosat, fulminazioni e sinottica relativi al nord italia. Radar dettagliato delle precipitazioni in tempo reale. Focus sul nord italia.';
    this.keywords = 'satellite nord meteo campoli, radar nord meteo campoli, radar precipitazioni nord italia meteo campoli, radar fulmini nord italia, radar precipitazioni zoom nord italia, radar pioggia nord italia, satellite nord italia';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/nord-italia';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

}
