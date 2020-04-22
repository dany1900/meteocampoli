import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'ulivi',
  templateUrl: './ulivi.component.html',
  styleUrls: ['./ulivi.component.css']
})
export class UliviComponent implements OnInit, OnChanges {


  constructor(private myElement: ElementRef, protected router: Router, private scroll: ViewportScroller) {
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
