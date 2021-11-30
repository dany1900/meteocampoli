import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-nord-webcam',
  templateUrl: './tab-nord-webcam.component.html',
  styleUrls: ['./tab-nord-webcam.component.css']
})
export class TabNordWebcamComponent implements OnInit {

  id: number;
  pathWebNordEst = '/webcam/montagna/nord-est';
  pathWebNordOvest = '/webcam/montagna/nord-ovest';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathWebNordEst:
        this.id = 0;
        break;
      case this.pathWebNordOvest:
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
      this.utility.titleMatTab = 'WebCam Nord Est Montagna';
      this.router.navigate([this.pathWebNordEst]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'WebCam Nord Ovest Montagna';
      this.router.navigate([this.pathWebNordOvest]);
    }
  }
}
