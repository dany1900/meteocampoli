import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'giardinaggio',
  templateUrl: './giardinaggio.component.html',
  styleUrls: ['./giardinaggio.component.css']
})
export class GiardinaggioComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, public utilityService: UtiliyService) {
    this.title = 'Giardinaggio - Articoli - Meteo Campoli';
    this.description = 'Articoli riguardanti le piante piu presenti in italia, con focus sulla ciociaria. Consigli dettagliati sulla lavorazione e potatura, informazioni sui cicli di vita. ';
    this.keywords = 'curiosita campoli, curiosita meteo campoli, giardinaggio meteo campoli, piante, ulivo, articoli giardinaggio';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/articoli/giardinaggio';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
  }

}
