import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-satellite-estero',
  templateUrl: './tab-satellite-estero.component.html',
  styleUrls: ['./tab-satellite-estero.component.css']
})
export class TabSatelliteEsteroComponent implements OnInit {

  id: number;
  pathSatEuropa = '/satellite/europa';
  pathSatMondo = '/satellite/mondo';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathSatEuropa:
        this.id = 0;
        break;
      case this.pathSatMondo:
        this.id = 1;
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
      this.utility.titleMatTab = 'Radar Precipitazioni Europa - Satellite Meteo';
      this.router.navigate([this.pathSatEuropa]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'Radar Precipitazioni Mondo - Satellite Meteo';
      this.router.navigate([this.pathSatMondo]);
    }
  }
}
