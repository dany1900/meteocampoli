import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {TerremotiResponse} from '../../terremoti/terremoti.interface';

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
  isVisible = false;

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
    // this.tabellaRadiosondaggi();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
  }

  calculateDate(): string {
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
    } else if (hours >= 15) {
      run = '12';
    }
    return this.link = 'https://weather.uwyo.edu/cgi-bin/sounding?region=europe&TYPE=TEXT%3ALIST&YEAR=' + year + '&MONTH=' + this.month + '&FROM=' + day + run + '&TO=' + day + run + '&STNM=16245';
    // return this.link = 'https://weather.uwyo.edu/cgi-bin/sounding?region=europe&TYPE=TEXT%3ALIST&YEAR=2022&MONTH=09&FROM=0112&TO=0112&STNM=16245';
  }

  tabellaRadiosondaggi() {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const d = new Date(today);
    d.setDate(d.getDate() - 5); // subtract 4 days
    const dateMinus4Day = d.toISOString().split('T')[0];
    const url = this.link;
    const headers = new HttpHeaders();
    headers.set('content-type', 'text/plain; charset=utf-8');
    return this.http.get(url, {headers: headers,  responseType: 'text'}).subscribe(data => {
      const eachLine = data?.toString().split('\n');
      let count = 0;
      eachLine?.forEach((line: string) => {
        if (count !== 0 && line) {
          const lineSplit = line.split('|');
          const date = new Date(lineSplit[1]);
          const dateFormatted = date.toLocaleString().replace(',', ' ');
          const terremoti: TerremotiResponse = {
            dataOra: dateFormatted,
            magnitudo: lineSplit[10],
            profondita: lineSplit[4],
            zona: lineSplit[12],
          };
          // this.arrResponse.push(terremoti);
        }
        this.isVisible = true;
        count++;
      });
      /*if (this.isVisible) {
        this.dataSource = new MatTableDataSource<TerremotiResponse>(this.arrResponse);
        this.dataSource.paginator = this.paginator;
        this.totalSize = this.arrResponse.length;
        this.iterator();
        this.imageLoader = false;
      }*/
    });
  }

  errorHandler(url: string) {
    this.http.get(url).subscribe(
      response => this.link,
      error => {
      }
    );
  }
}
