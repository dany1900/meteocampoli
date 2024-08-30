import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';


@Component({
  selector: 'tab-dati',
  templateUrl: './tab-dati.component.html',
  styleUrls: ['./tab-dati.component.css']
})
export class TabDatiComponent implements OnInit {

  id: number;
  pathStazioneTreo = '/dati-attuali';
  pathStazionePrato = '/dati-attuali/stazione-prato';
  paramTab: string;
  pathGlobale: string;

  constructor(private router: Router, public utility: UtiliyService) {
    this.paramTab = this.router.url;
    switch (this.paramTab) {
      case this.pathStazioneTreo:
        this.id = 0;
        this.pathGlobale = this.pathStazioneTreo;
        this.utility.titleMatTab = 'Stazione Meteo Via treo - Monitoraggio Meteo';
        break;
      case this.pathStazionePrato:
        this.id = 1;
        this.pathGlobale = this.pathStazionePrato;
        this.utility.titleMatTab = 'Stazione Meteo Loc Prato - Monitoraggio Meteo';
        break;
      default:
        this.pathGlobale = this.pathStazioneTreo;
        this.utility.titleMatTab = 'Stazione Meteo Via treo - Monitoraggio Meteo';
        this.id = 0;
        break;
    }
    this.router.navigate([this.pathGlobale]);
  }

  ngOnInit() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.router.navigate([this.pathStazioneTreo]);
    } else if (event === 1) {
      this.router.navigate([this.pathStazionePrato]);
    }
  }


  tabSelectionTabs(event) {
    if (event === 0) {
      this.router.navigate([this.pathStazioneTreo]);
    } else if (event === 1) {
      this.router.navigate([this.pathStazionePrato]);
    }
  }
}
