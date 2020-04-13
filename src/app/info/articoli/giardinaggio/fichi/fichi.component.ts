import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'fichi',
  templateUrl: './fichi.component.html',
  styleUrls: ['./fichi.component.css']
})
export class FichiComponent implements OnInit, OnChanges {


  constructor(private myElement: ElementRef, protected router: Router, private scroll: ViewportScroller) {
  }


  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('.header-macro-section');
    el.scrollIntoView({behavior: 'smooth'});
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
