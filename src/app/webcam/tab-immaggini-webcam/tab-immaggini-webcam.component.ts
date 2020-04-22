import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'tab-immaggini-webcam',
  templateUrl: './tab-immaggini-webcam.component.html',
  styleUrls: ['./tab-immaggini-webcam.component.css']
})
export class TabImmagginiWebcamComponent implements OnInit, OnChanges {

  id: number;

  constructor(private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

  ngOnChanges() {
  }

}
