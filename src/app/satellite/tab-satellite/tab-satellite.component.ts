import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';


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
  pathProtezioneCivile = '/satellite/italia';

  constructor(private router: Router, public utility: UtiliyService) {

    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathGenerale:
        this.id = 0;
        this.utility.titleMatTab = 'Radar Precipitazioni - Satellite Meteo';
        break;
      case this.pathCentroItalia:
        this.id = 1;
        this.utility.titleMatTab = 'Radar Precipitazioni Centro Italia - Satellite Meteo';
        break;
      case this.pathNordItalia:
        this.id = 2;
        this.utility.titleMatTab = 'Radar Precipitazioni Nord Italia - Satellite Meteo';
        break;
      case this.pathSudItalia:
        this.id = 3;
        this.utility.titleMatTab = 'Radar Precipitazioni Sud Italia e Isole - Satellite Meteo ';
        break;
      case this.pathProtezioneCivile:
        this.id = 4;
        this.utility.titleMatTab = 'Radar Precipitazioni Protezione Civile';
        break;
      default:
        this.utility.titleMatTab = 'Radar Precipitazioni - Satellite Meteo';
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  ngOnInit() {
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


