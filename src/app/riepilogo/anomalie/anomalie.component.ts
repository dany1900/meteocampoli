import {Component, OnInit, Renderer2} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'app-anomalie',
  templateUrl: './anomalie.component.html',
  styleUrls: ['./anomalie.component.css']
})
export class AnomalieComponent implements OnInit {

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
    this.title = 'Anomalie Temperature - Precipitazioni - Mare ';
    this.description = 'Mappe sulle anomalie di temperatura, precipitazione e mare. Tutti i dati divisi per periodi in italia, europa e mondo';
    this.keywords = 'anomalie mare, anomalie temperature, anomalie oceano, anomalie precipitazioni';
    this.ogUrl = 'www.meteocampoli.altervista.org/statistiche/anomalie';
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
