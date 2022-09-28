import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-centro-stazioni',
  templateUrl: './tab-centro-stazioni.component.html',
  styleUrls: ['./tab-centro-stazioni.component.css']
})
export class TabCentroStazioniComponent implements OnInit {

  id: number;
  pathWebLazio = '/stazioni-meteo/lazio';
  pathWebAbruzzo = '/stazioni-meteo/abruzzo';
  pathWebMolise = '/stazioni-meteo/molise';
  pathWebUmbria = '/stazioni-meteo/umbria';
  pathWebMarche = '/stazioni-meteo/marche';
  pathWebToscana = '/stazioni-meteo/toscana';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathWebLazio:
        this.id = 0;
        break;
      case this.pathWebAbruzzo:
        this.id = 1;
        break;
      case this.pathWebMolise:
        this.id = 2;
        break;
      case this.pathWebUmbria:
        this.id = 3;
        break;
      case this.pathWebMarche:
        this.id = 4;
        break;
      case this.pathWebToscana:
        this.id = 5;
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
      this.utility.titleMatTab = 'Stazioni Meteo Lazio - Temperature e Storico Dati';
      this.router.navigate([this.pathWebLazio]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'Stazioni Meteo Abruzzo - Temperature e Storico Dati';
      this.router.navigate([this.pathWebAbruzzo]);
    } else if (event === 2) {
      this.utility.titleMatTab = 'Stazioni Meteo Molise - Temperature e Storico Dati';
      this.router.navigate([this.pathWebMolise]);
    } else if (event === 3) {
      this.utility.titleMatTab = 'Stazioni Meteo Umbria - Temperature e Storico Dati';
      this.router.navigate([this.pathWebUmbria]);
    } else if (event === 4) {
      this.utility.titleMatTab = 'Stazioni Meteo Marche - Temperature e Storico Dati';
      this.router.navigate([this.pathWebMarche]);
    } else if (event === 5) {
      this.utility.titleMatTab = 'Stazioni Meteo Toscana - Temperature e Storico Dati';
      this.router.navigate([this.pathWebToscana]);
    }
  }
}
