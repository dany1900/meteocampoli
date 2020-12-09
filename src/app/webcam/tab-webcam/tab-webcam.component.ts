import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'tab-webcam',
  templateUrl: './tab-webcam.component.html',
  styleUrls: ['./tab-webcam.component.css']
})
export class TabWebcamComponent implements OnInit {

  id: number;
  pathWebLazio = '/webcam/montagna/lazio';
  pathWebAbruzzo = '/webcam/montagna/abruzzo';
  pathWebMolise = '/webcam/montagna/molise';
  pathWebUmbria = '/webcam/montagna/umbria';
  pathWebMarche = '/webcam/montagna/marche';
  pathWebToscana = '/webcam/montagna/toscana';
  @Input() path;


  constructor(private myElement: ElementRef, protected router: Router) {
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
      this.router.navigate([this.pathWebLazio]);
    } else if (event === 1) {
      this.router.navigate([this.pathWebAbruzzo]);
    } else if (event === 2) {
      this.router.navigate([this.pathWebMolise]);
    } else if (event === 3) {
      this.router.navigate([this.pathWebUmbria]);
    } else if (event === 4) {
      this.router.navigate([this.pathWebMarche]);
    } else if (event === 5) {
      this.router.navigate([this.pathWebToscana]);
    }
  }
}
