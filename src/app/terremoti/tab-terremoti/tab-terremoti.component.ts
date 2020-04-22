import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {SEOService} from '../../service/seoservice.service';

@Component({
  selector: 'tab-terremoti',
  templateUrl: './tab-terremoti.component.html',
  styleUrls: ['./tab-terremoti.component.css']
})
export class TabTerremotiComponent implements OnInit {


  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }
}
