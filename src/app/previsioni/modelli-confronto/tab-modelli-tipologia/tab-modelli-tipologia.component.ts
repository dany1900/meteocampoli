import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {ModelliCostants} from '../../../shared/constants/stazioni-meteo.constants';

@Component({
  selector: 'tab-modelli-tipologia',
  templateUrl: './tab-modelli-tipologia.component.html',
  styleUrls: ['./tab-modelli-tipologia.component.css']
})
export class TabModelliTipologiaComponent implements OnInit {

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
  @Input() modello;
  modelliCostants: ModelliCostants;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathGFS500Hpa:
      case this.pathECMWF500Hpa:
      case this.pathGEM500Hpa:
        this.id = 0;
        break;
      case this.pathGFS850Hpa:
      case this.pathECMWF850Hpa:
      case this.pathGEM850Hpa:
        this.id = 1;
        break;
      case this.pathGFSPrecipitazioni:
      case this.pathECMWFPrecipitazioni:
      case this.pathGEMPrecipitazioni:
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
    if (event === 0 && this.modello === ModelliCostants.GFS) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GFS 500Hpa';
      this.router.navigate([this.pathGFS500Hpa]);
    } else if (event === 0 && this.modello === ModelliCostants.ECMWF) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - ECMWF 500Hpa';
      this.router.navigate([this.pathECMWF500Hpa]);
    } else if (event === 0 && this.modello === ModelliCostants.GEM) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GEM 500Hpa';
      this.router.navigate([this.pathECMWF500Hpa]);
    } else if (event === 1 && this.modello === ModelliCostants.GFS) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GEM 850Hpa';
      this.router.navigate([this.pathGFS850Hpa]);
    } else if (event === 1 && this.modello === ModelliCostants.ECMWF) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GEM 850Hpa';
      this.router.navigate([this.pathECMWF850Hpa]);
    } else if (event === 1 && this.modello === ModelliCostants.GEM) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GEM 850Hpa';
      this.router.navigate([this.pathGEM850Hpa]);
    } else if (event === 2 && this.modello === ModelliCostants.GFS) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GFS Precipitazioni';
      this.router.navigate([this.pathGFSPrecipitazioni]);
    } else if (event === 2 && this.modello === ModelliCostants.ECMWF) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - ECMWF Precipitazioni';
      this.router.navigate([this.pathECMWFPrecipitazioni]);
    } else if (event === 2 && this.modello === ModelliCostants.GEM) {
      this.utility.titleMatTab = 'Previsione Modelli Meteo - GEM Precipitazioni';
      this.router.navigate([this.pathGEMPrecipitazioni]);
    }
  }
}
