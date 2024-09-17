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
  messageStazioni: string;

  constructor(private scroll: ViewportScroller, private http: HttpClient) {
    this.preventCache = Math.random();
    this.messageStazioni = MESSAGE.DISP_STAZIONI;
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  scrollToDown() {
    const scrollHeight = document.body.scrollHeight;
    this.scroll.scrollToPosition([0, scrollHeight]);
  }

  scrollToSpecifyPosition(isDati?: boolean) {
    if (this.isMobile()) {
      this.scroll.scrollToPosition([0, !isDati ? 1130 : 1130]);
    } else {
      this.scroll.scrollToPosition([0, !isDati ? 845 : 810]);
    }
  }

  isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  isHttps(): boolean {
    return location.protocol === 'https:';
  }
}
