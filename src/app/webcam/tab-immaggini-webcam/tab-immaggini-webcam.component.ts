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
  pathMontagna = '/webcam/montagna';
  pathLimitrofe = '/webcam/limitrofe';

  constructor(private myElement: ElementRef, protected router: Router) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathImmagini:
        this.id = 0;
        break;
      case this.pathMontagna:
        this.id = 1;
        break;
      case this.pathLimitrofe:
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

  ngOnChanges() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.router.navigate([this.pathImmagini]);
    } else if (event === 1) {
      this.router.navigate([this.pathMontagna]);
    } else if (event === 2) {
      this.router.navigate([this.pathLimitrofe]);
    }
  }

}
