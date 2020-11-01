import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SEOService} from '../../../../service/seoservice.service';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'ondata-caldo-2017',
  templateUrl: './ondata-caldo-2017.component.html',
  styleUrls: ['./ondata-caldo-2017.component.css']
})
export class OndataCaldo2017Component implements OnInit, OnChanges {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Ondata Caldo Storica 2017 - Meteo Meteo';
    this.description = 'Riepilogo dati dell ondata di caldo storica del 2017, tutti gli estremi dei paesi piu rilevanti del centro italia';
    this.keywords = '';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/curiosita/ondata-caldo-2017';
    this.ogImage = 'http://meteocampoli.altervista.org/images/meteocampoli.jpg';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
  }

  ngOnChanges() {
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }
}
