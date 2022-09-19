import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SEOService} from '../../../../service/seoservice.service';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'atmosfera',
  templateUrl: './atmosfera.component.html',
  styleUrls: ['./atmosfera.component.css']
})
export class AtmosferaComponent implements OnInit, OnChanges {


  title: string;
  description: string;
  ogUrl: string;
  keywords: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Atmosfera - Articoli - Meteo Campoli';
    this.description = '';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/meteo/atmosfera';
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
