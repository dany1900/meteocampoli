import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {UtiliyService} from '../../service/utiliy.service';


@Component({
  selector: 'satellite-sud',
  templateUrl: './satellite-sud.component.html',
  styleUrls: ['./satellite-sud.component.css']
})
export class SatelliteSudComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;


  constructor(private seo: SEOService, public utilityService: UtiliyService) {
    this.title = 'Radar Precipitazioni Sud Italia - Satellite Meteo';
    this.description = 'Radar dettagliato delle precipitazioni del sud italia. Satellite infrarossi, meteosat, fulminazioni e sinottica relativi al sud italia.';
    this.keywords = 'satellite sud meteo campoli, radar sud meteo campoli, radar precipitazioni sud italia meteo campoli, radar fulmini sud italia, radar precipitazioni zoom sud italia, radar pioggia sud italia, satellite sud italia';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/sud-italia';
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

