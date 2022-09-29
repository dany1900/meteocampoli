import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-sud-stazioni',
  templateUrl: './tab-sud-stazioni.component.html',
  styleUrls: ['./tab-sud-stazioni.component.css']
})
export class TabSudStazioniComponent implements OnInit {

  id: number;
  pathCampania = '/stazioni-meteo/campania';
  pathCalabria = '/stazioni-meteo/calabria';
  pathPuglia = '/stazioni-meteo/puglia';
  pathBasilicata = '/stazioni-meteo/basilicata';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathCampania:
        this.id = 0;
        break;
      case this.pathCalabria:
        this.id = 1;
        break;
      case this.pathPuglia:
        this.id = 2;
        break;
      case this.pathBasilicata:
        this.id = 3;
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
      this.utility.titleMatTab = 'Stazioni Meteo Campania - Temperature e Storico Dati';
      this.router.navigate([this.pathCampania]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'Stazioni Meteo Calabria - Temperature e Storico Dati';
      this.router.navigate([this.pathCalabria]);
    } else if (event === 2) {
      this.utility.titleMatTab = 'Stazioni Meteo Puglia - Temperature e Storico Dati';
      this.router.navigate([this.pathPuglia]);
    } else if (event === 3) {
      this.utility.titleMatTab = 'Stazioni Meteo Basilicata - Temperature e Storico Dati';
      this.router.navigate([this.pathBasilicata]);
    }
  }
}
