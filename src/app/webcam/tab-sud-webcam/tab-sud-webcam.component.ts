import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-sud-webcam',
  templateUrl: './tab-sud-webcam.component.html',
  styleUrls: ['./tab-sud-webcam.component.css']
})
export class TabSudWebcamComponent implements OnInit {

  id: number;
  pathWebSardegna = '/webcam/montagna/sardegna';
  pathWebSicilia = '/webcam/montagna/sicilia';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathWebSardegna:
        this.id = 0;
        break;
      case this.pathWebSicilia:
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
      this.utility.titleMatTab = 'WebCam Sardegna Montagna';
      this.router.navigate([this.pathWebSardegna]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'WebCam Sicilia Montagna';
      this.router.navigate([this.pathWebSicilia]);
    }
  }
}
