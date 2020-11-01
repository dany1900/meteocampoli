import {Injectable} from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtiliyService {

  constructor(private scroll: ViewportScroller) {
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  scrollToSpecifyPosition() {
    this.scroll.scrollToPosition([0, 565]);
  }

}
