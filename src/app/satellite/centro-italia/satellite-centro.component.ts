import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SEOService} from '../../service/seoservice.service';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'satellite-centro',
  templateUrl: './satellite-centro.component.html',
  styleUrls: ['./satellite-centro.component.css']
})
export class SatelliteCentroComponent implements OnInit {

  imageLoader = true;
  imageLoaderMovimento = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  urlSatellite: string;

  constructor(private seo: SEOService, public utilityService: UtiliyService, protected router: Router) {
    this.title = 'Radar Precipitazioni Centro Italia - Satellite Meteo';
    this.description = 'Satellite infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale. Focus sul centro italia.';
    this.keywords = 'satellite centro meteo campoli, radar centro meteo campoli, radar precipitazioni centro italia meteo campoli, radar fulmini centro italia, radar precipitazioni zoom centro italia, radar pioggia centro italia, satellite centro italia, radar pioggie toscana';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite-generale';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

  errorHandler() {
    this.urlSatellite = './assets/img/webcam-offline.png';
  }

}
