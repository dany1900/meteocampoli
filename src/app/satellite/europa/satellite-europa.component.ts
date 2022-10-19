import {Compiler, Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'satellite-europa',
  templateUrl: './satellite-europa.component.html',
  styleUrls: ['./satellite-europa.component.css']
})

export class SatelliteEuropaComponent implements OnInit {

  imageLoader = true;
  imageLoaderMovimento = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  urlSat: string;
  preventCache: number;
  isHttps: boolean;

  constructor(private seo: SEOService, public utilityService: UtiliyService, protected router: Router, private _compiler: Compiler) {
    this.title = 'Radar Precipitazioni Europa - Satellite Meteo';
    this.description = 'Monitoraggio del meteo in europa. Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale.';
    this.keywords = 'meteo satellite europa, meteo satellitare, satellite europa meteo campoli, radar meteo europa , radar precipitazioni europa meteo campoli, radar fulmini europa meteo campoli, radar precipitazioni europa zoom, radar pioggia europa meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/europa';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this._compiler.clearCache();
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.urlSat = 'https:///www.meteo60.fr/satellites/animation-satellite-ir-france.gif?v=' + Math.random();
    this.preventCache = Math.random();
  }


  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
    if (location.protocol === 'https:') {
      this.isHttps = true;
    }
  }


}
