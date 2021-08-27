import {Compiler, Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

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
  urlSat: string;
  preventCache: number;

  constructor(private seo: SEOService, public utilityService: UtiliyService, protected router: Router, private _compiler: Compiler) {
    this.title = 'Radar Precipitazioni - Satellite Meteo';
    this.description = 'Monitoraggio completo del meteo. Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale.';
    this.keywords = 'satellite meteo campoli, radar meteo campoli, radar precipitazioni meteo campoli, radar fulmini meteo campoli, radar precipitazioni zoom, radar pioggia meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite-generale';
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
  }


}
