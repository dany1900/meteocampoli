import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'radio-sondaggi',
  templateUrl: './radio-sondaggi.component.html',
  styleUrls: ['./radio-sondaggi.component.css']
})
export class RadioSondaggiComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  link: string;
  month: string;
  myAngularxQrCode: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService, private http: HttpClient) {
    this.title = 'RadioSondaggi - Meteo Campoli';
    this.description = 'Radio Sondaggi Europa. Riepilogo dettagliato del radiosondaggio di pratica di mare. Link al riepilogo di tutti i sistemi di rilevazione.';
    this.keywords = 'radiosondaggio meteo campoli, radiosondaggio pratica di mare, radiosondaggio, radiosondaggio italia, radiosondaggio europa, radiosondaggi';
    this.ogUrl = 'www.meteocampoli.altervista.org/dati-attuali/radio-sondaggi';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.link = this.calculateDate();
    this.myAngularxQrCode = 'https://www.liceoluciopiccolo.edu.it/e-teacher/italiano/Alessandro_Manzoni.pdf';
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
  }

  calculateDate(): string {
    // tslint:disable-next-line:no-console
    const today = new Date();
    const year = today.getFullYear();
    this.month = (today.getMonth() + 1).toString();
    if (Number(this.month) < 9) {
      this.month = '0' + this.month.toString();
    }
    let day = String(today.getDate()).padStart(2, '0');
    const hours = today.getHours();
    let run = '00';
    if (hours <= 2) {
      run = '12';
      day = (Number(day) - 1).toString();
    } else if (hours >= 16) {
      run = '12';
    }
    this.link = 'http://weather.uwyo.edu/cgi-bin/sounding?region=europe&TYPE=TEXT%3ALIST&YEAR=' + year + '&MONTH=' + this.month + '&FROM=' + day + run + '&TO=' + day + run + '&STNM=16245';
    return this.getImageUrlStatus(this.link, year, this.month, day, run);
  }

  getImageUrlStatus(url: string, year: number, month: string, day: string, run: string): string {
    this.http.get(url).subscribe(
      response => this.link,
      error => {
        if (run === '12') {
          run = '00';
        } else if (run === '00') {
          run = '12';
        }
        this.link = 'http://weather.uwyo.edu/cgi-bin/sounding?region=europe&TYPE=TEXT%3ALIST&YEAR=' + year + '&MONTH=' + this.month + '&FROM=' + day + '00' + '&TO=' + day + '00' + '&STNM=16245';
      }
    );
    return this.link;
  }
}
