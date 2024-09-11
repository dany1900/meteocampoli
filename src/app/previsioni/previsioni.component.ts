import {Component, OnInit, Renderer2} from '@angular/core';
import {SEOService} from '../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../service/utiliy.service';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'previsioni',
  templateUrl: './previsioni.component.html',
  styleUrls: ['./previsioni.component.css']
})
export class PrevisioniComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  date: string;
  linkGfs: string;
  linkGem: string;
  linkEcmwf: string;
  runGfs: string;
  runGem: string;
  runEcmwf: string;
  runEUkmo: string;


  constructor(private seo: SEOService, protected router: Router, public renderer: Renderer2, public utilityService: UtiliyService, public deviceService: DeviceDetectorService) {
    this.title = 'Previsioni Meteo - Meteogrammi';
    this.description = 'Previsioni meteo dettagliate locali e nazionali. Analisi radio sondaggi e meteogrammi con tendenza a lungo termine.';
    this.keywords = 'previsioni meteo campoli, previsioni italia, meteogrammi, meteogramma gfs, meteogramma ecmwf, previsiono campoli 3bmeteo, previsioni campoli appennino, Tendenza meteo, previsioni meteo campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/previsioni';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.linkEcmwf = this.calculateDateEcmwf();
    this.linkGfs = this.calculateDateGfs();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }


  toggleClass(event: any, classe: string) {
    const hasClass = event.target.classList.contains(classe);
    if (hasClass) {
      this.renderer.removeClass(event.target, classe);
    } else {
      this.renderer.addClass(event.target, classe);
    }
  }

  calculateDateEcmwf(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    const day = String(today.getDate());
    if (Number(month) > 0 &&  Number(month) < 10) {
      month = '0' + month;
    }
    const hours = today.getHours();
    this.runEcmwf = '00';
    if (hours >= 21) {
      this.runEcmwf = '12';
    }
    this.date = year + month + day + this.runEcmwf;
    //return this.linkEcmwf = 'https://charts.ecmwf.int/products/opencharts_meteogram?base_time=' + this.date-adapter.ts + '00&epsgram=classical_plume&lat=41.7357&lon=13.6837&station_name=Campoli%20Appennino';
    return this.linkEcmwf = 'https://www.wetterzentrale.de/de/ens_image.php?geoid=75620&var=201&run=' + this.runEcmwf + '&date-adapter.ts=' + year + '-' + month + '-' + day + '&model=ecm&member=ENS&bw=1';
  }

  calculateDateGfs(): string {
    const today = new Date();
    const hours = today.getHours();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    if (hours >= 1 && hours < 7) {
      this.runGfs = '18';
    }
    if (hours >= 7 && hours < 12) {
      this.runGfs = '00';
    }
    if (hours >= 12 && hours < 18) {
      this.runGfs = '06';
    }
    if (hours >= 18 || (hours >= 0 && hours < 1)) {
      this.runGfs = '12';
    }
    if ((hours >= 0 && hours < 7) || hours >= 19) {
      this.runGem = '12';
    }
    if (hours >= 7 && hours < 19) {
      this.runGem = '00';
    }
    this.linkGem = 'https://www.wetterzentrale.de/de/ens_image.php?geoid=75620&var=201&run=' + this.runGem + '&date-adapter.ts=' + year + '-' + month + '-' + day + '&model=gem&member=ENS&bw=1';
    return this.linkGfs = 'https://www.wetterzentrale.de/de/ens_image.php?geoid=75620&var=201&run=' + this.runGfs + '&date-adapter.ts=' + year + '-' + month + '-' + day + '&model=gfs&member=ENS&bw=1';
  }

}
