import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SEOService} from '../../../../service/seoservice.service';
import {UtiliyService} from '../../../../service/utiliy.service';

@Component({
  selector: 'nocciolo',
  templateUrl: './nocciolo.component.html',
  styleUrls: ['./nocciolo.component.css']
})
export class NoccioloComponent implements OnInit, OnChanges {


  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(protected router: Router, private seo: SEOService, public utilityService: UtiliyService) {
    this.title = 'Nocciolo - Articoli - Meteo Campoli';
    this.description = 'Informazioni generali sulla pianta del nocciolo. Ciclo di maturazione, quando  e come preparare il terreno, tutti gli accorgimento necessari per la potatura';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/giardinaggio/nocciolo';
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
