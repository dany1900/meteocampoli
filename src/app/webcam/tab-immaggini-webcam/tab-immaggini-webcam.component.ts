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
  pathLimitrofe = '/webcam/limitrofe';
  pathNord = '/webcam/nord-italia';

  constructor(private myElement: ElementRef, protected router: Router) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathImmagini:
        this.id = 0;
        break;
      case this.pathMontagnaLazio:
        this.id = 1;
        break;
      case this.pathLimitrofe:
        this.id = 2;
        break;
      case this.pathNord:
        this.id = 3;
        break;
      case this.pathMontagnaAbruzzo:
        this.id = 1;
        break;
      case this.pathMontagnaMolise:
        this.id = 1;
        break;
      case this.pathMontagnaUmbria:
        this.id = 1;
        break;
      case this.pathMontagnaToscana:
        this.id = 1;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('.header-macro-section');
    el.scrollIntoView();
  }

  ngOnChanges() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.router.navigate([this.pathImmagini]);
    } else if (event === 1) {
      this.router.navigate([this.pathMontagnaLazio]);
    } else if (event === 2) {
      this.router.navigate([this.pathLimitrofe]);
    } else if (event === 3) {
      this.router.navigate([this.pathNord]);
    } else if (event === 4) {
      this.router.navigate([this.pathMontagnaAbruzzo]);
    }
  }

}
