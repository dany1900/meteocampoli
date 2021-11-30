import {Component, OnInit, Renderer2} from '@angular/core';
import {SEOService} from '../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../service/utiliy.service';

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
  linkEcmwf: string;
  runGfs: string;

  constructor(private seo: SEOService, protected router: Router, public renderer: Renderer2, public utilityService: UtiliyService) {
    this.title = 'Previsioni Meteo - Monitoraggio Indici Climatici e Teleconnessioni - Meteogrammi';
    this.description = 'Previsioni meteo dettagliate locali e nazionali. Monitoraggio degli indici climatici. Analisi radio sondaggi e meteogrammi con tendenza a lungo termine.';
    this.keywords = 'monitoraggio indici troposfera, Previsioni meteo campoli, indice NOA, Indici climatici, teleconnessioni, previsiono campoli 3bmeteo, previsioni campoli appennino, Tendenza meteo, previsioni meteo campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/previsioni';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.linkEcmwf = this.calculateDateEcmwf();
    this.runGfs = this.calculateDateGfs();
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
    const month = (today.getMonth() + 1).toString();
    const day = String(today.getDate()).padStart(2, '0');
    const hours = today.getHours();
    let emission = '00';
    if (hours >= 21) {
      emission = '12';
    }
    this.date = year + month + day + emission;
    return this.linkEcmwf = 'https://www.ecmwf.int/en/forecasts/charts/web/classical_meteogram?facets=undefined&time=' + this.date + ',0,' + this.date + '&epsgram=classical_plume&lat=41.7357&lon=13.6837&station_name=Campoli%20Appennino,%20Italy&altitude=600';
  }

  calculateDateGfs(): string {
    const today = new Date();
    const hours = today.getHours();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.runGfs = year + month.toString() + day;

    if (hours >= 1 && hours < 7) {
      this.runGfs += '18';
    }
    if (hours >= 7 && hours < 13) {
      this.runGfs += '0';
    }
    if (hours >= 13 && hours < 18) {
      this.runGfs += '06';
    }
    if (hours >= 19 || hours === 0) {
      this.runGfs += '12';
    }
    //return this.linkGfs = 'https://modeles.meteociel.fr/modeles/gens/graphe_ens3.php?x=&y=&run=' + this.runGfs + '&lat=41.72&lon=13.687&ext=1&type=0';
    return this.linkGfs = 'https://modeles16.meteociel.fr/modeles/gensp/runs/' + this.runGfs + '/graphe9_00000___13.687_41.72_.gif';
  }

}
