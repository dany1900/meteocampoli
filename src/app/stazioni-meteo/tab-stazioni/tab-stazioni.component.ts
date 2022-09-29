import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';


@Component({
  selector: 'tab-stazioni',
  templateUrl: './tab-stazioni.component.html',
  styleUrls: ['./tab-stazioni.component.css']
})
export class TabStazioniComponent implements OnInit, OnChanges {
  id: number;
  paramTab: string;
  pathGlobale = '';
  pathGenerale = '/stazioni-meteo/generale';
  pathLazio = '/stazioni-meteo/lazio';
  pathAbruzzo = '/stazioni-meteo/abruzzo';
  pathMolise = '/stazioni-meteo/molise';
  pathUmbria = '/stazioni-meteo/umbria';
  pathMarche = '/stazioni-meteo/marche';
  pathToscana = '/stazioni-meteo/toscana';
  pathNordEst = '/stazioni-meteo/nord-est';
  pathNordOvest = '/stazioni-meteo/nord-ovest';
  pathEmiliaRomagna = '/stazioni-meteo/emilia-romagna';
  pathCampania = '/stazioni-meteo/campania';
  pathCalabria = '/stazioni-meteo/calabria';
  pathPuglia = '/stazioni-meteo/puglia';
  pathBasilicata = '/stazioni-meteo/basilicata';
  pathSicilia = '/stazioni-meteo/sicilia';
  pathSardegna = '/stazioni-meteo/sardegna';
  pathReteMeteo = '/stazioni-meteo/rete-meteo';
  isNord: boolean;

  constructor(private router: Router, private myElement: ElementRef, public utility: UtiliyService) {
    this.paramTab = this.router.url;
    if (this.paramTab === this.pathNordOvest || this.paramTab === this.pathNordEst || this.paramTab === this.pathEmiliaRomagna) {
      this.isNord = true;
      switch (this.paramTab) {
        case this.pathNordOvest:
          this.id = 2;
          this.pathGlobale = this.pathNordOvest;
          this.utility.titleMatTab = 'Stazioni Meteo Nord Ovest - Temperature e Storico Dati';
          break;
        case this.pathNordEst:
          this.id = 2;
          this.pathGlobale = this.pathNordEst;
          this.utility.titleMatTab = 'Stazioni Meteo Nord est - Temperature e Storico Dati';
          break;
        case this.pathEmiliaRomagna:
          this.id = 2;
          this.pathGlobale = this.pathEmiliaRomagna;
          this.utility.titleMatTab = 'Stazioni Meteo Emilia Romagna - Temperature e Storico Dati';
          break;
      }
    } else {
      switch (this.paramTab) {
        case this.pathGenerale:
          this.id = 0;
          this.pathGlobale = this.pathGenerale;
          this.utility.titleMatTab = 'Stazioni Meteo - Temperature e Storico Dati ';
          break;
        case this.pathLazio:
          this.id = 1;
          this.pathGlobale = this.pathLazio;
          this.utility.titleMatTab = 'Stazioni Meteo Lazio - Temperature e Storico Dati ';
          break;
        case this.pathAbruzzo:
          this.id = 1;
          this.pathGlobale = this.pathAbruzzo;
          this.utility.titleMatTab = 'Stazioni Meteo Abruzzo - Temperature e Storico Dati ';
          break;
        case this.pathMolise:
          this.id = 1;
          this.pathGlobale = this.pathMolise;
          this.utility.titleMatTab = 'Stazioni Meteo Molise - Temperature e Storico Dati ';
          break;
        case this.pathUmbria:
          this.id = 1;
          this.pathGlobale = this.pathUmbria;
          this.utility.titleMatTab = 'Stazioni Meteo Umbria - Temperature e Storico Dati ';
          break;
        case this.pathMarche:
          this.id = 1;
          this.pathGlobale = this.pathMarche;
          this.utility.titleMatTab = 'Stazioni Meteo Marche - Temperature e Storico Dati ';
          break;
        case this.pathToscana:
          this.id = 1;
          this.pathGlobale = this.pathToscana;
          this.utility.titleMatTab = 'Stazioni Meteo Toscana - Temperature e Storico Dati ';
          break;
        case this.pathCampania:
          this.id = 3;
          this.pathGlobale = this.pathCampania;
          this.utility.titleMatTab = 'Stazioni Meteo Campania - Temperature e Storico Dati ';
          break;
        case this.pathCalabria:
          this.id = 3;
          this.pathGlobale = this.pathCalabria;
          this.utility.titleMatTab = 'Stazioni Meteo Calabria - Temperature e Storico Dati ';
          break;
        case this.pathPuglia:
          this.id = 3;
          this.pathGlobale = this.pathPuglia;
          this.utility.titleMatTab = 'Stazioni Meteo Puglia - Temperature e Storico Dati ';
          break;
        case this.pathBasilicata:
          this.id = 3;
          this.pathGlobale = this.pathBasilicata;
          this.utility.titleMatTab = 'Stazioni Meteo Basilicata - Temperature e Storico Dati ';
          break;
        case this.pathSardegna:
          this.id = 4;
          this.pathGlobale = this.pathSardegna;
          this.utility.titleMatTab = 'Stazioni Meteo Sardegna - Temperature e Storico Dati ';
          break;
        case this.pathSicilia:
          this.id = 4;
          this.pathGlobale = this.pathSicilia;
          this.utility.titleMatTab = 'Stazioni Meteo Sicilia - Temperature e Storico Dati ';
          break;
        case this.pathReteMeteo:
          this.id = 5;
          this.pathGlobale = this.pathReteMeteo;
          this.utility.titleMatTab = 'Stazioni Meteo Italia - Mappa Interattiva ';
          break;
        default:
          this.id = 0;
          this.pathGlobale = this.pathGenerale;
          this.utility.titleMatTab = 'Stazioni Meteo - Temperature e Storico Dati ';
          break;
      }
    }
    this.router.navigate([this.pathGlobale]);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

  ngOnChanges() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.router.navigate([this.pathGenerale]);
    } else if (event === 1) {
      this.router.navigate([this.pathLazio]);
    } else if (event === 2) {
      this.router.navigate([this.pathNordEst]);
      this.isNord = false;
    } else if (event === 3) {
      this.router.navigate([this.pathCampania]);
    } else if (event === 4) {
      this.router.navigate([this.pathSardegna]);
    } else if (event === 5) {
      this.router.navigate([this.pathReteMeteo]);
    }
  }
}
