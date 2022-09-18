import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {UtiliyService} from '../../service/utiliy.service';


@Component({
  selector: 'satellite-sicilia',
  templateUrl: './satellite-sicilia.component.html',
  styleUrls: ['./satellite-sicilia.component.css']
})
export class SatelliteSiciliaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;


  constructor(private seo: SEOService, public utilityService: UtiliyService) {
    this.title = 'Radar Precipitazioni Sardegna - Satellite Meteo';
    this.description = 'Radar dettagliato delle precipitazioni  in sicilia. Satelliti infrarossi, meteosat, fulminazioni e sinottica relativi alla sicilia.';
    this.keywords = 'satellite sicilia meteo campoli, radar sicilia meteo campoli, radar precipitazioni sicilia, radar fulmini sicilia, radar pioggia sardegna sicilia, satellite sicilia';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/sicilia';
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

