import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SEOService} from '../../../../service/seoservice.service';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'stratwarming',
  templateUrl: './stratwarming.component.html',
  styleUrls: ['./stratwarming.component.css']
})
export class StratwarmingComponent implements OnInit, OnChanges {


  title: string;
  description: string;
  ogUrl: string;
  keywords: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Stratwarming - Articoli - Meteo Campoli';
    this.description = '';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/meteo/stratwarming';
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
