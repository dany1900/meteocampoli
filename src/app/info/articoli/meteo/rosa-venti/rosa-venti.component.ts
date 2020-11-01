import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SEOService} from '../../../../service/seoservice.service';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'rosa-venti',
  templateUrl: './rosa-venti.component.html',
  styleUrls: ['./rosa-venti.component.css']
})
export class RosaVentiComponent implements OnInit, OnChanges {


  title: string;
  description: string;
  ogUrl: string;
  keywords: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Rosa dei Venti - Articoli - Meteo Campoli';
    this.description = 'La rosa dei venti rappresenta schematicamente la provenienza dei venti che insistono  in una determinata regione, durante un periodo di tempo piuttosto lungo...';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/meteo/rosa-venti';
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
