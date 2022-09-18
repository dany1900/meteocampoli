import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-satellite-sud',
  templateUrl: './tab-satellite-sud.component.html',
  styleUrls: ['./tab-satellite-sud.component.css']
})
export class TabSatelliteSudComponent implements OnInit {

  id: number;
  pathWebSud = '/satellite/sud-italia';
  pathWebSardegna = '/satellite/sardegna';
  pathWebSicilia = '/satellite/sicilia';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathWebSud:
        this.id = 0;
        break;
      case this.pathWebSardegna:
        this.id = 1;
        break;
      case this.pathWebSicilia:
        this.id = 2;
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
      this.utility.titleMatTab = 'Radar Precipitazioni Sud Italia - Satellite Meteo';
      this.router.navigate([this.pathWebSud]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'Radar Precipitazioni Sardegna';
      this.router.navigate([this.pathWebSardegna]);
    } else if (event === 2) {
      this.utility.titleMatTab = 'Radar Precipitazioni Sicilia';
      this.router.navigate([this.pathWebSicilia]);
    }
  }
}
