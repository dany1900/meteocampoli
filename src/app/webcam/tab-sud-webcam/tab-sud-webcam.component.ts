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
  pathCampania = '/webcam/montagna/campania';
  pathCalabria = '/webcam/montagna/calabria';
  pathPuglia = '/webcam/montagna/puglia';
  pathBasilicata = '/webcam/montagna/basilicata';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathCampania:
        this.id = 0;
        break;
      case this.pathCalabria:
        this.id = 1;
        break;
      case this.pathPuglia:
        this.id = 2;
        break;
      case this.pathBasilicata:
        this.id = 3;
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
      this.utility.titleMatTab = 'WebCam Campania Montagna';
      this.router.navigate([this.pathCampania]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'WebCam Calabria Montagna';
      this.router.navigate([this.pathCalabria]);
    } else if (event === 2) {
      this.utility.titleMatTab = 'WebCam Puglia Montagna';
      this.router.navigate([this.pathPuglia]);
    } else if (event === 3) {
      this.utility.titleMatTab = 'WebCam Basilicata Montagna';
      this.router.navigate([this.pathBasilicata]);
    }
  }
}
