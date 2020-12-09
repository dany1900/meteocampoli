import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'tab-immaggini-webcam',
  templateUrl: './tab-immaggini-webcam.component.html',
  styleUrls: ['./tab-immaggini-webcam.component.css']
})
export class TabImmagginiWebcamComponent implements OnInit, OnChanges {

  id: number;
  pathImmagini = '/webcam/immagini';
  pathMontagnaLazio = '/webcam/montagna/lazio';
  pathMontagnaAbruzzo = '/webcam/montagna/abruzzo';
  pathMontagnaMolise = '/webcam/montagna/molise';
  pathMontagnaUmbria = '/webcam/montagna/umbria';
  pathMontagnaToscana = '/webcam/montagna/toscana';
  pathMontagnaMarche = '/webcam/montagna/marche';
  pathLimitrofe = '/webcam/limitrofe';
  pathNord = '/webcam/nord-italia';
  pathGlobale = '';

  constructor(private myElement: ElementRef, protected router: Router) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathImmagini:
        this.pathGlobale = this.pathImmagini;
        this.id = 0;
        break;
      case this.pathMontagnaLazio:
        this.pathGlobale = this.pathMontagnaLazio;
        this.id = 1;
        break;
      case this.pathLimitrofe:
        this.pathGlobale = this.pathLimitrofe;
        this.id = 2;
        break;
      case this.pathNord:
        this.pathGlobale = this.pathNord;
        this.id = 3;
        break;
      case this.pathMontagnaAbruzzo:
        this.pathGlobale = this.pathMontagnaAbruzzo;
        this.id = 1;
        break;
      case this.pathMontagnaMolise:
        this.pathGlobale = this.pathMontagnaMolise;
        this.id = 1;
        break;
      case this.pathMontagnaUmbria:
        this.pathGlobale = this.pathMontagnaUmbria;
        this.id = 1;
        break;
      case this.pathMontagnaMarche:
        this.pathGlobale = this.pathMontagnaMarche;
        this.id = 1;
        break;
      case this.pathMontagnaToscana:
        this.pathGlobale = this.pathMontagnaToscana;
        this.id = 1;
        break;
      default:
        this.id = 0;
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
}
