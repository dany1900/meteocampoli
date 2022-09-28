import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-isole-stazioni',
  templateUrl: './tab-isole-stazioni.component.html',
  styleUrls: ['./tab-isole-stazioni.component.css']
})
export class TabIsoleStazioniComponent implements OnInit {

  id: number;
  pathSardegna = '/stazioni-meteo/sardegna';
  pathSicilia = '/stazioni-meteo/sicilia';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathSardegna:
        this.id = 0;
        break;
      case this.pathSicilia:
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
       this.utility.titleMatTab = 'Stazioni Meteo Sardegna - Temperature e Storico Dati ';
      this.router.navigate([this.pathSardegna]);
    } else if (event === 1) {
       this.utility.titleMatTab = 'Stazioni Meteo Sicilia - Temperature e Storico Dati ';
      this.router.navigate([this.pathSicilia]);
    }
  }
}
