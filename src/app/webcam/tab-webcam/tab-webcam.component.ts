import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-webcam',
  templateUrl: './tab-webcam.component.html',
  styleUrls: ['./tab-webcam.component.css']
})
export class TabWebcamComponent implements OnInit, OnChanges {

  id: number;
  pathMontagnaLazio = '/webcam/montagna/lazio';
  pathMontagnaAbruzzo = '/webcam/montagna/abruzzo';
  pathMontagnaMolise = '/webcam/montagna/molise';
  pathMontagnaUmbria = '/webcam/montagna/umbria';
  pathMontagnaToscana = '/webcam/montagna/toscana';
  pathMontagnaMarche = '/webcam/montagna/marche';
  pathLimitrofe = '/webcam/limitrofe';
  pathCampania = '/webcam/montagna/campania';
  pathCalabria = '/webcam/montagna/calabria';
  pathPuglia = '/webcam/montagna/puglia';
  pathBasilicata = '/webcam/montagna/basilicata';
  pathSardegna = '/webcam/montagna/sardegna';
  pathSicilia = '/webcam/montagna/sicilia';
  pathNordEst = '/webcam/montagna/nord-est';
  pathNordOvest = '/webcam/montagna/nord-ovest';
  pathEmiliaRomagna = '/webcam/montagna/emilia-romagna';
  paramTab: string;
  pathGlobale = '';
  isNord: boolean;
  isSud: boolean;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    this.paramTab = this.router.url;
    if (this.paramTab === this.pathNordOvest || this.paramTab === this.pathNordEst || this.paramTab === this.pathEmiliaRomagna) {
      this.isNord = true;
      switch (this.paramTab) {
        case this.pathNordOvest:
          this.id = 2;
          this.pathGlobale = this.pathNordOvest;
          this.utility.titleMatTab = 'WebCam Nord Ovest Montagna';
          break;
        case this.pathNordEst:
          this.id = 2;
          this.pathGlobale = this.pathNordEst;
          this.utility.titleMatTab = 'WebCam Nord Est Montagna';
          break;
        case this.pathEmiliaRomagna:
          this.id = 2;
          this.pathGlobale = this.pathEmiliaRomagna;
          this.utility.titleMatTab = 'WebCam Emilia Romagna Montagna';
          break;
      }
    } else {
      switch (this.paramTab) {
        case this.pathMontagnaLazio:
          this.pathGlobale = this.pathMontagnaLazio;
          this.utility.titleMatTab = 'WebCam Lazio Montagna';
          this.id = 0;
          break;
        case this.pathLimitrofe:
          this.pathGlobale = this.pathLimitrofe;
          this.utility.titleMatTab = 'WebCam Valle di Comino - WebCam Frosinone';
          this.id = 1;
          break;
        case this.pathNordEst:
          this.pathGlobale = this.pathNordEst;
          this.id = 2;
          this.utility.titleMatTab = 'WebCam Nord Est Montagna';
          break;
        case this.pathNordOvest:
          this.pathGlobale = this.pathNordOvest;
          this.id = 2;
          this.utility.titleMatTab = 'WebCam Nord Ovest Montagna';
          break;
        case this.pathEmiliaRomagna:
          this.pathGlobale = this.pathEmiliaRomagna;
          this.id = 2;
          this.utility.titleMatTab = 'WebCam Emilia Romagna Montagna';
          break;
        case this.pathCampania:
          this.id = 3;
          this.pathGlobale = this.pathCampania;
          this.utility.titleMatTab = 'WebCam Campania Montagna';
          break;
        case this.pathCalabria:
          this.id = 3;
          this.pathGlobale = this.pathCalabria;
          this.utility.titleMatTab = 'WebCam Calabria Montagna';
          break;
        case this.pathPuglia:
          this.id = 3;
          this.pathGlobale = this.pathPuglia;
          this.utility.titleMatTab = 'WebCam Puglia Montagna';
          break;
        case this.pathBasilicata:
          this.id = 3;
          this.pathGlobale = this.pathBasilicata;
          this.utility.titleMatTab = 'WebCam Basilicata Montagna';
          break;
        case this.pathSardegna:
          this.pathGlobale = this.pathSardegna;
          this.id = 4;
          this.utility.titleMatTab = 'WebCam Sardegna Montagna';
          break;
        case this.pathSicilia:
          this.pathGlobale = this.pathSicilia;
          this.id = 4;
          this.utility.titleMatTab = 'WebCam Sicilia Montagna';
          break;
        case this.pathMontagnaAbruzzo:
          this.pathGlobale = this.pathMontagnaAbruzzo;
          this.utility.titleMatTab = 'WebCam Abruzzo Montagna';
          this.id = 0;
          break;
        case this.pathMontagnaMolise:
          this.pathGlobale = this.pathMontagnaMolise;
          this.utility.titleMatTab = 'WebCam Molise Montagna';
          this.id = 0;
          break;
        case this.pathMontagnaUmbria:
          this.pathGlobale = this.pathMontagnaUmbria;
          this.utility.titleMatTab = 'WebCam Umbria Montagna';
          this.id = 0;
          break;
        case this.pathMontagnaMarche:
          this.pathGlobale = this.pathMontagnaMarche;
          this.utility.titleMatTab = 'WebCam Marche Montagna';
          this.id = 0;
          break;
        case this.pathMontagnaToscana:
          this.pathGlobale = this.pathMontagnaToscana;
          this.utility.titleMatTab = 'WebCam Toscana Montagna';
          this.id = 0;
          break;
        default:
          this.id = 0;
          this.utility.titleMatTab = 'WebCam Lazio Montagna';
          break;
      }
    }
    this.router.navigate([this.pathGlobale]);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.header-macro-section');
    el.scrollIntoView();
  }

  ngOnChanges() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.router.navigate([this.pathMontagnaLazio]);
    } else if (event === 1) {
      this.router.navigate([this.pathLimitrofe]);
    } else if (event === 2) {
      this.router.navigate([this.pathNordEst]);
      this.isNord = false;
    } else if (event === 3) {
      this.router.navigate([this.pathCampania]);
      this.isSud = false;
    } else if (event === 4) {
      this.router.navigate([this.pathSardegna]);
      this.isSud = false;
    }
  }
}
