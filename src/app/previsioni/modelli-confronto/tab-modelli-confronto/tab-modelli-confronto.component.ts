import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {ModelliCostants} from '../../../shared/constants/stazioni-meteo.constants';

@Component({
  selector: 'tab-modelli-confronto',
  templateUrl: './tab-modelli-confronto.component.html',
  styleUrls: ['./tab-modelli-confronto.component.css']
})
export class TabModelliConfrontoComponent implements OnInit {

  id: number;
  pathGFS500Hpa = '/previsioni/gfs/500Hpa';
  pathECMWF500Hpa = '/previsioni/ecmwf/500Hpa';
  pathGEM500Hpa = '/previsioni/gem/500Hpa';
  pathGFS850Hpa = '/previsioni/gfs/850Hpa';
  pathECMWF850Hpa = '/previsioni/ecmwf/850Hpa';
  pathGEM850Hpa = '/previsioni/gem/850Hpa';
  pathGFSPrecipitazioni = '/previsioni/gfs/precipitazioni';
  pathECMWFPrecipitazioni = '/previsioni/ecmwf/precipitazioni';
  pathGEMPrecipitazioni = '/previsioni/gem/precipitazioni';
  @Input() path;
  ModelliCostants: ModelliCostants;
  modelloGFS = ModelliCostants.GFS;
  modelloECMWF = ModelliCostants.ECMWF;
  modelloGEM = ModelliCostants.GEM;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathGFS500Hpa:
        this.utility.titleMatTab = 'GFS Temperature 500Hpa - Modelli Meteo ';
        this.id = 0;
        break;
      case this.pathGFS850Hpa:
        this.utility.titleMatTab = 'GFS Temperature 850Hpa - Modelli Meteo ';
        this.id = 0;
        break;
      case this.pathGFSPrecipitazioni:
        this.utility.titleMatTab = 'GFS Precipitazioni - Modelli Meteo ';
        this.id = 0;
        break;
      case this.pathECMWF500Hpa:
        this.utility.titleMatTab = 'ECMWF Temperature 500Hpa - Modelli Meteo ';
        this.id = 1;
        break;
      case this.pathECMWF850Hpa:
        this.utility.titleMatTab = 'ECMWF Temperature 850Hpa - Modelli Meteo ';
        this.id = 1;
        break;
      case this.pathECMWFPrecipitazioni:
        this.utility.titleMatTab = 'ECMWF Precipitazioni - Modelli Meteo ';
        this.id = 1;
        break;
      case this.pathGEM500Hpa:
        this.utility.titleMatTab = 'GEM Temperature 500Hpa - Modelli Meteo ';
        this.id = 2;
        break;
      case this.pathGEM850Hpa:
        this.utility.titleMatTab = 'GEM Temperature 850Hpa - Modelli Meteo ';
        this.id = 2;
        break;
      case this.pathGEMPrecipitazioni:
        this.utility.titleMatTab = 'GEM Precipitazioni - Modelli Meteo ';
        this.id = 2;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id, paramTab);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

  tabSelectionChanged(event, paramTab?: string) {
    if (event === 0 && !paramTab) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GFS 500Hpa';
      this.router.navigate([this.pathGFS500Hpa]);
    } else if (event === 1 && !paramTab) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - ECMWF 500Hpa';
      this.router.navigate([this.pathECMWF500Hpa]);
    } else if (event === 2 && !paramTab) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GEM 500Hpa';
      this.router.navigate([this.pathGEM500Hpa]);
    }
    if (event === 0 && this.path === this.pathGFS500Hpa) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GFS 500Hpa';
      this.router.navigate([this.pathGFS500Hpa]);
    } else if (event === 0 && this.path === this.pathGFS850Hpa) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - ECMWF 500Hpa';
      this.router.navigate([this.pathGFS850Hpa]);
    } else if (event === 0 && this.path === this.pathGFSPrecipitazioni) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GEM 500Hpa';
      this.router.navigate([this.pathGFSPrecipitazioni]);
    }  if (event === 1 && this.path === this.pathGFS850Hpa) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GFS 850Hpa';
      this.router.navigate([this.pathGFS850Hpa]);
    } else if (event === 1 && this.path === this.pathECMWF850Hpa) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - ECMWF 850Hpa';
      this.router.navigate([this.pathECMWF850Hpa]);
    } else if (event === 1 && this.path === this.pathGEM850Hpa) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GEM 850Hpa';
      this.router.navigate([this.pathGEM850Hpa]);
    } if (event === 2 && this.path === this.pathGFSPrecipitazioni) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GFS Precipitazioni';
      this.router.navigate([this.pathGFSPrecipitazioni]);
    } else if (event === 2 && this.path === this.pathECMWFPrecipitazioni) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - ECMWF Precipitazioni';
      this.router.navigate([this.pathECMWFPrecipitazioni]);
    } else if (event === 2 && this.path === this.pathGEMPrecipitazioni) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GEM Precipitazioni';
      this.router.navigate([this.pathGEMPrecipitazioni]);
    }
  }
}
