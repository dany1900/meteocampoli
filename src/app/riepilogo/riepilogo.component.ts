import {Component, OnInit} from '@angular/core';
import {SEOService} from '../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../service/utiliy.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.css']
})

export class RiepilogoComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService, private sanitizer: DomSanitizer) {
    this.title = 'Statistiche Stazione Meteo Campoli - Riepilogo Dati';
    this.description = 'Statistiche complessive della stazione meteo di Campoli Appennino posta a 500mt. Completo di tutti i dati giornalieri,mensili,annuali e grafici.';
    this.keywords = 'statistiche stazione meteo campoli, riepilogo stazione meteo campoli, statistiche meteo campoli, riepilogo dati stazione meteo campoli, Stazione meteo campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/riepilogo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();

  }

  getSafeComment(): SafeHtml {
    return this
      .sanitizer
      .bypassSecurityTrustHtml('./riepilogo.component.html');
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition(true);
  }

}
