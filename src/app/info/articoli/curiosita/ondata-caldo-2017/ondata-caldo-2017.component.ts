import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {SEOService} from '../../../../service/seoservice.service';

@Component({
  selector: 'ondata-caldo-2017',
  templateUrl: './ondata-caldo-2017.component.html',
  styleUrls: ['./ondata-caldo-2017.component.css']
})
export class OndataCaldo2017Component implements OnInit, OnChanges {


  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
  }

  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('.header-macro-section');
    el.scrollIntoView();
  }

  ngOnChanges() {
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }


}
