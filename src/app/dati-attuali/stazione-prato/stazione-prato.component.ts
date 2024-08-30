import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'stazione-prato',
  templateUrl: './stazione-prato.component.html',
  styleUrls: ['./stazione-prato.component.css']
})
export class StazionePratoComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  height: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService, private http: HttpClient) {
    this.title = 'Stazione Meteo Loc Prato - Meteo Campoli';
    this.description = 'Stazione meteo località prato (587mt). Tutti i dati in tempo reale e le statistiche aggiornate 24/24 della nuova stazione';
    this.keywords = 'stazione meteo campoli, stazione meteo prato, stazione meteo località prato, stazione campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/dati-attuali/stazione-prato';
    this.ogImage = 'http://meteocampoli.altervista.org/images/meteocampoli.jpg';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition(true);
    if (this.utilityService.isMobile()) {
      this.height = '2400';
    } else {
      this.height = '3200';
    }
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }

}
