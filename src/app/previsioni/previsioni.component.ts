import {Component, OnInit, Renderer2} from '@angular/core';
import {SEOService} from '../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../service/utiliy.service';

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

  constructor(private seo: SEOService, protected router: Router, public renderer: Renderer2, public utilityService: UtiliyService) {
    this.title = 'Previsioni Meteo - Meteogrammi - Monitoraggio Indici Climatici - Meteo Campoli';
    this.description = 'Previsioni meteo dettagliate locali e nazionali. Monitoraggio degli indici climatici. Analisi radio sondaggi e meteogrammi con tendenza a lungo termine.';
    this.keywords = 'Previsioni meteo campoli, indice NOA, Indici climatici, Tendenza meteo, previsioni meteo campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/previsioni';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
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

}
