import {Component, OnInit, Renderer2} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'app-temperature-mare',
  templateUrl: './temperature-mare.component.html',
  styleUrls: ['./temperature-mare.component.css']
})
export class TemperatureMareComponent implements OnInit {

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
  todayDate: string;

  constructor(private seo: SEOService, protected router: Router, public renderer: Renderer2, public utilityService: UtiliyService) {
    this.title = 'Temperature Mare - Meteo Campoli';
    this.description = 'Monitoraggio della temperature dei mari. Tutte le anomalie rilevate giornalmente e mensilmente.';
    this.keywords = 'temperature mare, anomalie mare, temperature oceano';
    this.ogUrl = 'www.meteocampoli.altervista.org/temperature-mare';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.todayDate = date.toISOString().slice(0, 10);
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
