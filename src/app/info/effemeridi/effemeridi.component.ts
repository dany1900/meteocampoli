import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'effemeridi',
  templateUrl: './effemeridi.component.html',
  styleUrls: ['./effemeridi.component.css']
})
export class EffemeridiComponent implements OnInit, AfterViewInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Orari Alba Tramonto - Meteo Campoli';
    this.description = 'Orari di alba e tramonto dettagliati di Campoli Appennino. Informazioni relative alla durata dei giorni per ogni mese, informazioni sulla posizione geografica con coordinate';
    this.keywords = 'effemeridi campoli, orario alba campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/effemeridi';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
  }

  ngAfterViewInit() {
  }
}
