import {Injectable} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MESSAGE} from '../utils/message';

@Injectable({
  providedIn: 'root'
})
export class UtiliyService {

  preventCache: number;
  titleMatTab = '';
  url = 'http://weather.uwyo.edu/cgi-bin/sounding';  // URL to web api
  messageStazioni: string;
  messageModelli: string;

  constructor(private scroll: ViewportScroller, private http: HttpClient) {
    this.preventCache = Math.random();
    this.messageStazioni = MESSAGE.DISP_STAZIONI;
    this.messageModelli = MESSAGE.DISP_MODELLI;
    /*const params = new HttpParams().set('region', 'europe').set('TYPE', 'TEXT:LIST').set('YEAR', String(2021)).set('MONTH', '01')
      .set('FROM', String(1212)).set('TO', String(1212)).set('STNM', String(16245));
    this.http.get(this.url, {
      params: params,
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(console.log);*/
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  scrollToSpecifyPosition() {
    if (this.isMobile()) {
      this.scroll.scrollToPosition([0, 1130]);
    } else {
      this.scroll.scrollToPosition([0, 845]);
    }
  }

  isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
}
