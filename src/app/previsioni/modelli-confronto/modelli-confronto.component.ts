import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {ActivatedRoute} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {ModelliCostants, ModelliTypeCostants} from '../../shared/constants/stazioni-meteo.constants';

@Component({
  selector: 'modelli-confronto',
  templateUrl: './modelli-confronto.component.html',
  styleUrls: ['./modelli-confronto.component.css']
})
export class ModelliConfrontoComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  preventCache: number;
  @Input() modello;
  modelsRun: string;
  tipoModello: string;
  tipoModelloQuery: number;


  constructor(private seo: SEOService, public utilityService: UtiliyService, public renderer: Renderer2, private activeRouted: ActivatedRoute) {
    this.title = 'Confronto Modelli - Meteo Campoli';
    this.description = 'Confronto dei migliori modelli Meteo. Mappe a 500Hpa, 850Hpa e precipitazioni facilmente visualizzabili';
    this.keywords = 'confronto meteo campoli, confronto modelli meteo campoli, modelli meteo';
    this.ogUrl = 'www.meteocampoli.altervista.org/previsioni/500Hpa';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.preventCache = Math.random();
    this.modello = this.activeRouted.snapshot.data.modello;
    this.tipoModello = this.activeRouted.snapshot.data.tipo;
    this.modelsRun = this.calculateRunModel();
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

  calculateRunModel(): string {
    const today = new Date();
    const hours = today.getHours();
    if (this.modello === ModelliCostants.GFS) {
      if (hours >= 1 && hours < 7) {
        this.modelsRun = '18';
      }
      if (hours >= 7 && hours < 13) {
        this.modelsRun = '00';
      }
      if (hours >= 13 && hours <= 18) {
        this.modelsRun = '06';
      }
      if (hours >= 19 || (hours >= 0 && hours < 1)) {
        this.modelsRun = '12';
      }
    } else if (this.modello === ModelliCostants.ECMWF) {
      this.modelsRun = '00';
      if (hours >= 21) {
        this.modelsRun = '12';
      }
    } else if (this.modello === ModelliCostants.GEM) {
      if ((hours >= 0 && hours < 7) || hours >= 20) {
        this.modelsRun = '12';
      }
      if (hours >= 7 && hours <= 19) {
        this.modelsRun = '00';
      }
    }
    if (this.tipoModello === ModelliTypeCostants.HPA_500) {
      this.tipoModelloQuery = 1;
    } else if (this.tipoModello === ModelliTypeCostants.HPA_850) {
      this.tipoModelloQuery = 2;
    } else {
      this.tipoModelloQuery = 4;
    }
    return this.modelsRun;
  }

}
