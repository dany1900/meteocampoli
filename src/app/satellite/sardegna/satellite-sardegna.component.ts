import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {UtiliyService} from '../../service/utiliy.service';


@Component({
  selector: 'satellite-sardegna',
  templateUrl: './satellite-sardegna.component.html',
  styleUrls: ['./satellite-sardegna.component.css']
})
export class SatelliteSardegnaComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;


  constructor(private seo: SEOService, public utilityService: UtiliyService) {
    this.title = 'Radar Precipitazioni Sardegna - Satellite Meteo';
    this.description = 'Radar dettagliato delle precipitazioni  in sardegna. Satelliti infrarossi, meteosat, fulminazioni e sinottica relativi alla sardegna.';
    this.keywords = 'satellite sardegna meteo campoli, radar sardegna meteo campoli, radar precipitazioni sardegna, radar fulmini sardegna, radar pioggia sardegna sicilia, satellite sardegna';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/sardegna';
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

