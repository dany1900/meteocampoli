import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'tab-info',
  templateUrl: './tab-info.component.html',
  styleUrls: ['./tab-info.component.css']
})
export class TabInfoComponent implements OnInit {

  id: number;
  pathArticoli = '/info/articoli/meteo';
  pathCuriosita = '/info/curiosita';
  pathEffemeridi = '/info/effemeridi';

  constructor(private router: Router, private myElement: ElementRef) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathArticoli:
        this.id = 0;
        break;
      case this.pathCuriosita:
        this.id = 1;
        break;
      case this.pathEffemeridi:
        this.id = 2;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.router.navigate([this.pathArticoli]);
    } else if (event === 1) {
      this.router.navigate([this.pathCuriosita]);
    } else if (event === 2) {
      this.router.navigate([this.pathEffemeridi]);
    }
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

}
