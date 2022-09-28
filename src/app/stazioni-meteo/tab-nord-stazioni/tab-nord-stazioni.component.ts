import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-nord-stazioni',
  templateUrl: './tab-nord-stazioni.component.html',
  styleUrls: ['./tab-nord-stazioni.component.css']
})
export class TabNordStazioniComponent implements OnInit {

  id: number;
  pathNordEst = '/stazioni-meteo/nord-est';
  pathNordOvest = '/stazioni-meteo/nord-ovest';
  pathEmiliaRomagna = '/stazioni-meteo/emilia-romagna';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathNordEst:
        this.id = 0;
        break;
      case this.pathNordOvest:
        this.id = 1;
        break;
      case this.pathEmiliaRomagna:
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
    if (event === 0) {
      this.utility.titleMatTab = 'Stazioni Meteo Nord Est - Temperature e Storico Dati';
      this.router.navigate([this.pathNordEst]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'Stazioni Meteo Nord Ovest - Temperature e Storico Dati';
      this.router.navigate([this.pathNordOvest]);
    } else if (event === 2) {
      this.utility.titleMatTab = 'Stazioni Meteo Emilia Romagna - Temperature e Storico Dati';
      this.router.navigate([this.pathEmiliaRomagna]);
    }
  }
}
