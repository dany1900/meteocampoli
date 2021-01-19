import {Component, OnInit, Renderer2} from '@angular/core';
import {SEOService} from '../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../service/utiliy.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-previsioni',
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
  environmentsProd: any;
  date: string;
  link: string;

  constructor(private seo: SEOService, protected router: Router, public renderer: Renderer2, public utilityService: UtiliyService) {
    this.title = 'Previsioni Meteo - Monitoraggio Indici Climatici e Teleconnessioni - Meteogrammi';
    this.description = 'Previsioni meteo dettagliate locali e nazionali. Monitoraggio degli indici climatici. Analisi radio sondaggi e meteogrammi con tendenza a lungo termine.';
    this.keywords = 'monitoraggio indici troposfera, Previsioni meteo campoli, indice NOA, Indici climatici, teleconnessioni, previsiono campoli 3bmeteo, previsioni campoli appennino, Tendenza meteo, previsioni meteo campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/previsioni';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.environmentsProd = environment.production;
    this.calculateDate();
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

  calculateDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth().toString() + 1;
    const day = String(today.getDate()).padStart(2, '0');
    const hours = today.getHours();
    let emission = '00';
    if (hours >= 21) {
      emission = '12';
    }
    this.date = year + month + day + emission;
    this.link = 'https://www.ecmwf.int/en/forecasts/charts/web/classical_meteogram?facets=undefined&time=' + this.date + ',0,' + this.date + '&epsgram=classical_plume&lat=41.7357&lon=13.6837&station_name=Campoli%20Appennino,%20Italy&altitude=662';
  }

}
