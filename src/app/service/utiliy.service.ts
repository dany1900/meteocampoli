import {Injectable} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtiliyService {

  preventCache = Math.random();
  titleMatTab = '';
  url = 'http://weather.uwyo.edu/cgi-bin/sounding';  // URL to web api

  constructor(private scroll: ViewportScroller, private http: HttpClient) {
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
      this.scroll.scrollToPosition([0, 950]);
    } else {
      this.scroll.scrollToPosition([0, 810]);
    }
  }

  isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

}
