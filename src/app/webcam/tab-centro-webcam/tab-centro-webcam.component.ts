import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'tab-centro-webcam',
  templateUrl: './tab-centro-webcam.component.html',
  styleUrls: ['./tab-centro-webcam.component.css']
})
export class TabCentroWebcamComponent implements OnInit {

  id: number;
  pathWebLazio = '/webcam/montagna/lazio';
  pathWebAbruzzo = '/webcam/montagna/abruzzo';
  pathWebMolise = '/webcam/montagna/molise';
  pathWebUmbria = '/webcam/montagna/umbria';
  pathWebMarche = '/webcam/montagna/marche';
  pathWebToscana = '/webcam/montagna/toscana';
  @Input() path;

  constructor(private myElement: ElementRef, protected router: Router, public utility: UtiliyService) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathWebLazio:
        this.id = 0;
        break;
      case this.pathWebAbruzzo:
        this.id = 1;
        break;
      case this.pathWebMolise:
        this.id = 2;
        break;
      case this.pathWebUmbria:
        this.id = 3;
        break;
      case this.pathWebMarche:
        this.id = 4;
        break;
      case this.pathWebToscana:
        this.id = 5;
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
      this.utility.titleMatTab = 'WebCam Lazio Montagna';
      this.router.navigate([this.pathWebLazio]);
    } else if (event === 1) {
      this.utility.titleMatTab = 'WebCam Abruzzo Montagna';
      this.router.navigate([this.pathWebAbruzzo]);
    } else if (event === 2) {
      this.utility.titleMatTab = 'WebCam Molise Montagna';
      this.router.navigate([this.pathWebMolise]);
    } else if (event === 3) {
      this.utility.titleMatTab = 'WebCam Umbria Montagna';
      this.router.navigate([this.pathWebUmbria]);
    } else if (event === 4) {
      this.utility.titleMatTab = 'WebCam Marche Montagna';
      this.router.navigate([this.pathWebMarche]);
    } else if (event === 5) {
      this.utility.titleMatTab = 'WebCam Toscana Montagna';
      this.router.navigate([this.pathWebToscana]);
    }
  }
}
