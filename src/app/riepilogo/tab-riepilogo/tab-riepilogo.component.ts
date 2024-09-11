import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';


@Component({
  selector: 'tab-riepilogo',
  templateUrl: './tab-riepilogo.component.html',
  styleUrls: ['./tab-riepilogo.component.css']
})
export class TabRiepilogoComponent implements OnInit {

  id: number;
  pathStazioneTreo = '/riepilogo';
  pathStazionePrato = '/riepilogo/stazione-prato';
  paramTab: string;
  pathGlobale: string;

  constructor(private router: Router, public utility: UtiliyService) {
    this.paramTab = this.router.url;
    switch (this.paramTab) {
      case this.pathStazioneTreo:
        this.id = 0;
        this.pathGlobale = this.pathStazioneTreo;
        this.utility.titleMatTab = 'Riepilogo Stazione Meteo Campoli Via treo - 500mt';
        break;
      case this.pathStazionePrato:
        this.id = 1;
        this.pathGlobale = this.pathStazionePrato;
        this.utility.titleMatTab = 'Riepilogo Stazione Meteo Campoli Loc Prato - 587mt';
        break;
      default:
        this.pathGlobale = this.pathStazioneTreo;
        this.utility.titleMatTab = 'Riepilogo Stazione Meteo Campoli Via treo - 500mt';
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
