import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'tab-articoli',
  templateUrl: './tab-articoli.component.html',
  styleUrls: ['./tab-articoli.component.css']
})
export class TabArticoliComponent implements OnInit, OnChanges {

  id: number;
  pathArticoliMeteo = '/info/articoli/meteo';
  pathArticoliGiardinaggio = '/info/articoli/giardinaggio';

  constructor(private router: Router, private myElement: ElementRef) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathArticoliMeteo:
        this.id = 0;
        break;
      case this.pathArticoliGiardinaggio:
        this.id = 1;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  ngOnInit(): void {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

  ngOnChanges() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.router.navigate([this.pathArticoliMeteo]);
    } else if (event === 1) {
      this.router.navigate([this.pathArticoliGiardinaggio]);
    }
  }
}
