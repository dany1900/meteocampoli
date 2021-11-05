import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SEOService} from '../../../../service/seoservice.service';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'inquinamento-rimedi',
  templateUrl: './inquinamento-rimedi.component.html',
  styleUrls: ['./inquinamento-rimedi.component.css']
})
export class InquinamentoRimediComponent implements OnInit, OnChanges {


  title: string;
  description: string;
  ogUrl: string;
  keywords: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Inquinamento aria - Articoli - Meteo Campoli';
    this.description = 'L\'inquinamento dell\'aria sulle aree notoriamente più soggette sta acquisendo sempre maggior importanza. Un forte contributo arriva direttamente dalle condizioni meteorologiche...';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/giardinaggio/ulivo';
    this.ogImage = '';
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
