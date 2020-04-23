import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'tab-satellite',
  templateUrl: './tab-satellite.component.html',
  styleUrls: ['./tab-satellite.component.css']
})
export class TabSatelliteComponent implements OnInit {

  id: number;
  pathGenerale = '/satellite/generale';
  pathCentroItalia = '/satellite/centro-italia';
  pathNordItalia = '/satellite/nord-italia';
  pathSudItalia = '/satellite/sud-italia';
  pathProtezioneCivile = '/satellite/protezione-civile';

  constructor(private router: Router, private myElement: ElementRef) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathGenerale:
        this.id = 0;
        break;
      case this.pathCentroItalia:
        this.id = 1;
        break;
      case this.pathNordItalia:
        this.id = 2;
        break;
      case this.pathSudItalia:
        this.id = 3;
        break;
      case this.pathProtezioneCivile:
        this.id = 4;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.router.navigate([this.pathGenerale]);
    } else if (event === 1) {
      this.router.navigate([this.pathCentroItalia]);
    } else if (event === 2) {
      this.router.navigate([this.pathNordItalia]);
    } else if (event === 3) {
      this.router.navigate([this.pathSudItalia]);
    } else if (event === 4) {
      this.router.navigate([this.pathProtezioneCivile]);
    }
  }
}


