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
  pathSardegna = '/satellite/sardegna';
  pathSicilia = '/satellite/sicilia';
  pathItalia = '/satellite/italia';
  pathTabEstero = '/satellite/estero';
  pathEuropa = '/satellite/europa';
  pathMondo = '/satellite/mondo';
  pathGlobale = '';
  isEstero: boolean;
  isSudIsole: boolean;
  paramTab: string;

  constructor(private router: Router, public utility: UtiliyService) {
    this.isEstero = false;
    this.paramTab = this.router.url;
    if (this.paramTab === this.pathEuropa || this.paramTab === this.pathMondo) {
      this.isEstero = true;
      switch (this.paramTab) {
        case this.pathEuropa:
          this.id = 5;
          this.pathGlobale = this.pathEuropa;
          this.utility.titleMatTab = 'Radar Precipitazioni Europa - Satellite Meteo';
          break;
        case this.pathMondo:
          this.id = 6;
          this.pathGlobale = this.pathMondo;
          this.utility.titleMatTab = 'Radar Precipitazioni Mondo - Satellite Meteo';
          break;
      }
    } else if (this.paramTab === this.pathSudItalia || this.paramTab === this.pathSardegna) {
      this.isSudIsole = true;
      switch (this.paramTab) {
        case this.pathSudItalia:
          this.id = 3;
          this.pathGlobale = this.pathSudItalia;
          this.utility.titleMatTab = 'Radar Precipitazioni Sud Italia - Satellite Meteo';
          break;
        case this.pathSardegna:
          this.id = 3;
          this.pathGlobale = this.pathSardegna;
          this.utility.titleMatTab = 'Radar Precipitazioni Sardegna - Satellite Meteo';
          break;
        case this.pathSicilia:
          this.id = 3;
          this.pathGlobale = this.pathSicilia;
          this.utility.titleMatTab = 'Radar Precipitazioni Sicilia - Satellite Meteo';
          break;
      }
    } else {
      switch (this.paramTab) {
        case this.pathGenerale:
          this.id = 0;
          this.pathGlobale = this.pathGenerale;
          this.utility.titleMatTab = 'Radar Precipitazioni - Satellite Meteo';
          break;
        case this.pathCentroItalia:
          this.id = 1;
          this.pathGlobale = this.pathCentroItalia;
          this.utility.titleMatTab = 'Radar Precipitazioni Centro Italia - Satellite Meteo';
          break;
        case this.pathNordItalia:
          this.id = 2;
          this.pathGlobale = this.pathNordItalia;
          this.utility.titleMatTab = 'Radar Precipitazioni Nord Italia - Satellite Meteo';
          break;
        case this.pathSudItalia:
          this.id = 3;
          this.pathGlobale = this.pathSudItalia;
          this.utility.titleMatTab = 'Radar Precipitazioni Sud Italia - Satellite Meteo ';
          break;
        case this.pathSardegna:
          this.id = 3;
          this.pathGlobale = this.pathSardegna;
          this.utility.titleMatTab = 'Radar Precipitazioni Sardegna - Satellite Meteo ';
          break;
        case this.pathSicilia:
          this.id = 3;
          this.pathGlobale = this.pathSicilia;
          this.utility.titleMatTab = 'Radar Precipitazioni Sicilia - Satellite Meteo ';
          break;
        case this.pathItalia:
          this.id = 4;
          this.pathGlobale = this.pathItalia;
          this.utility.titleMatTab = 'Radar Precipitazioni Protezione Civile';
          break;
        case this.pathEuropa:
          this.id = 5;
          this.pathGlobale = this.pathEuropa;
          this.utility.titleMatTab = 'Radar Precipitazioni Europa - Satellite Meteo';
          break;
        case this.pathMondo:
          this.id = 5;
          this.pathGlobale = this.pathMondo;
          this.utility.titleMatTab = 'Radar Precipitazioni Mondo - Satellite Meteo';
          break;
        default:
          this.pathGlobale = this.pathGenerale;
          this.utility.titleMatTab = 'Radar Precipitazioni - Satellite Meteo';
          this.id = 0;
          break;
      }
    }
    this.router.navigate([this.pathGlobale]);
  }

  ngOnInit() {
  }

  tabSelectionChanged(event) {
      if (event === 0) {
        this.router.navigate([this.pathGenerale]);
        this.isEstero = false;
      } else if (event === 1) {
        this.router.navigate([this.pathCentroItalia]);
        this.isEstero = false;
      } else if (event === 2) {
        this.router.navigate([this.pathNordItalia]);
        this.isEstero = false;
      } else if (event === 3) {
        this.router.navigate([this.pathSudItalia]);
        this.isEstero = false;
      } else if (event === 4) {
        this.router.navigate([this.pathItalia]);
        this.isEstero = false;
      } else if (event === 5) {
        this.router.navigate([this.pathEuropa]);
        this.isEstero = true;
      }
  }


  tabSelectionTabs(event) {
    if (this.isEstero) {
      if (event === 0 || event === 5) {
        this.router.navigate([this.pathEuropa]);
      } else if (event === 1 || event === 6) {
        this.router.navigate([this.pathMondo]);
      }
    }  else {
      if (event === 0) {
        this.router.navigate([this.pathGenerale]);
      } else if (event === 1) {
        this.router.navigate([this.pathCentroItalia]);
      } else if (event === 2) {
        this.router.navigate([this.pathNordItalia]);
      } else if (event === 3) {
        this.router.navigate([this.pathSudItalia]);
      } else if (event === 4) {
        this.router.navigate([this.pathItalia]);
      } else if (event === 5) {
        this.router.navigate([this.pathEuropa]);
      }
    }
  }

}
