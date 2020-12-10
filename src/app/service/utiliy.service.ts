import {Injectable} from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtiliyService {

  preventCache = Math.random();
  titleMatTab = '';

  constructor(private scroll: ViewportScroller) {
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
