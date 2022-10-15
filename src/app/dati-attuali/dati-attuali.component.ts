import {Component, OnDestroy, OnInit} from '@angular/core';
import {SEOService} from '../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../service/utiliy.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'dati-attuali',
  templateUrl: './dati-attuali.component.html',
  styleUrls: ['./dati-attuali.component.css']
})
export class DatiAttualiComponent implements OnInit, OnDestroy {

  path: string;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  linkRapportoAnnuale: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService, private http: HttpClient) {
    this.path = 'https://www.meteocampoliappennino.altervista.org/grafico.png?v=' + Math.random();
    this.title = 'Meteo Campoli - Monitoraggio Meteo';
    this.description = 'Tutte le stazioni locali e del centro italia visualizzabili con comodi script.Completo di Mappe, Radar, WebCam e Previsioni. Il miglior sito meteo di monitoraggio.';
    this.keywords = 'Previsioni meteo campoli, stazione meteo campoli, Dati attuali campoli, temperature stazioni meteo, stazioni meteo centro italia, Stazione campoli appennino';
    this.ogUrl = 'www.meteocampoli.altervista.org/dati-attuali';
    this.ogImage = 'http://meteocampoli.altervista.org/images/meteocampoli.jpg';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
    const today = new Date();
    const year = today.getFullYear();
    this.linkRapportoAnnuale = 'https://meteocampoliappennino.altervista.org/noaa/NOAA_ANNUALE.php?annee1=' + year + '&period=r_annuel';
    /*if (environment.production) {
      let headers = new HttpHeaders().set('header-name', 'header-value');
      headers = headers.set('header-name-2', 'header-value-2');
      this.http
        .get(this.router.url, {headers: headers})
        .subscribe();
    } */
  }

  ngOnDestroy(): void {
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }

}
