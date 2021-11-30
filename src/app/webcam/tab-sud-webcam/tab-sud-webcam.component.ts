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
  pathWebSud = '/webcam/montagna/sud-italia';
  pathWebIsole = '/webcam/montagna/isole';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathWebSud:
        this.id = 0;
        break;
      case this.pathWebIsole:
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
      this.utility.titleMatTab = 'WebCam Sud Montagna';
      this.router.navigate([this.pathWebSud]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'WebCam Isole Montagna';
      this.router.navigate([this.pathWebIsole]);
    }
  }
}
