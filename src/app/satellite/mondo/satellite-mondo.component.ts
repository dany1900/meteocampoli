import {Compiler, Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'satellite-mondo',
  templateUrl: './satellite-mondo.component.html',
  styleUrls: ['./satellite-mondo.component.css']
})

export class SatelliteMondoComponent implements OnInit {

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
    this.title = 'Radar Precipitazioni Mondo - Satellite Meteo';
    this.description = 'Monitoraggio del meteo nel mondo. Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale.';
    this.keywords = 'meteo satellite mondo, meteo satellitare estero, satellite estero meteo campoli, radar meteo mondo , radar precipitazioni mondo meteo campoli, radar fulmini estero meteo campoli, radar precipitazioni mondo zoom, radar pioggia mondo meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/mondo';
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
