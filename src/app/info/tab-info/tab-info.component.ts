import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

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
  pathContattaci = '/info/contatti';

  constructor(private router: Router, private myElement: ElementRef, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathArticoli:
        this.id = 0;
        this.utility.titleMatTab = 'Curiosità Metereologia - Articoli - Meteo Campoli';
        break;
      case this.pathCuriosita:
        this.id = 1;
        this.utility.titleMatTab = 'Curiosita - Meteo Campoli';
        break;
      case this.pathEffemeridi:
        this.id = 2;
        this.utility.titleMatTab = 'Orari Alba Tramonto Campoli Appennino - Meteo Campoli';
        break;
      case this.pathContattaci:
        this.id = 3;
        this.utility.titleMatTab = 'Contattaci - Meteo Campoli';
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
    } else if (event === 3) {
      this.router.navigate([this.pathContattaci]);
    }
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

}
