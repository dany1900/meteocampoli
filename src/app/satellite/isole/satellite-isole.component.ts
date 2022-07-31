import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {UtiliyService} from '../../service/utiliy.service';


@Component({
  selector: 'satellite-isole',
  templateUrl: './satellite-isole.component.html',
  styleUrls: ['./satellite-isole.component.css']
})
export class SatelliteIsoleComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;


  constructor(private seo: SEOService, public utilityService: UtiliyService) {
    this.title = 'Radar Precipitazioni Sardegna e Sicilia - Satellite Meteo';
    this.description = 'Radar dettagliato delle precipitazioni  in sardegna e sicilia. Satelliti infrarossi, meteosat, fulminazioni e sinottica relativi alle isole.';
    this.keywords = 'satellite sardegna meteo campoli, radar sardegna meteo campoli, radar precipitazioni isole, radar fulmini isole, radar precipitazioni sicilia, radar pioggia sardegna sicilia, satellite sardegna';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/isole';
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

