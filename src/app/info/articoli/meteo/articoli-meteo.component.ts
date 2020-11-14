import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'articoli-meteo',
  templateUrl: './articoli-meteo.component.html',
  styleUrls: ['./articoli-meteo.component.css']
})
export class ArticoliMeteoComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, public utilityService: UtiliyService) {
    this.title = 'Curiosità Metereologia - Articoli - Meteo Campoli';
    this.description = 'Articoli sul fenomeno della metereologia , tutte le curiosità in continuo aggiornamento';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/meteo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
  }
}
