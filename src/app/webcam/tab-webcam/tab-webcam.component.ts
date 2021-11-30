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
  pathTabNord = '/webcam/montagna/nord';
  pathTabSud = '/webcam/montagna/sud';
  pathSud = '/webcam/montagna/sud-italia';
  pathIsole = '/webcam/montagna/isole';
  pathNordEst = '/webcam/montagna/nord-est';
  pathNordOvest = '/webcam/montagna/nord-ovest';
  paramTab: string;
  pathGlobale = '';

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    this.paramTab = this.router.url;
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
      case this.pathTabNord:
      case this.pathNordEst:
      case this.pathNordOvest:
        this.pathGlobale = this.pathTabNord;
        this.id = 2;
        this.utility.titleMatTab = 'WebCam Nord Italia Montagna';
        break;
      case this.pathTabSud:
      case this.pathSud:
      case this.pathIsole:
        this.pathGlobale = this.pathTabSud;
        this.id = 3;
        this.utility.titleMatTab = 'WebCam Sud Italia e Isole Montagna';
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
      this.router.navigate([this.pathTabNord]);
    } else if (event === 3) {
      this.router.navigate([this.pathTabSud]);
    } else if (event === 4) {
      this.router.navigate([this.pathMontagnaAbruzzo]);
    }
  }
}
