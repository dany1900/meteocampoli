import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'tab-immaggini-webcam',
  templateUrl: './tab-immaggini-webcam.component.html',
  styleUrls: ['./tab-immaggini-webcam.component.css']
})
export class TabImmagginiWebcamComponent implements OnInit, OnChanges {

  id: number;
  isMontagna = false;
  isLimitrofe = false;
  isImmagini = false;

  constructor(private router: Router,
              private route: ActivatedRoute) {

    this.router.events.filter(evt => evt instanceof NavigationEnd)
      .subscribe((event) => {
        const paramTab = this.route.firstChild.routeConfig.path;
        switch (paramTab) {
          case 'immagini':
            this.id = 0;
            break;
          case 'montagna':
            this.id = 1;
            break;
          case 'limitrofe':
            this.id = 2;
            break;
          default:
            this.id = 0;
            break;
        }
        this.tabSelectionChanged(this.id);
      });
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.isImmagini = true;
    }
    else if (event === 1) {
      this.isMontagna = true;
    }
    else if (event === 2) {
      this.isLimitrofe = true;
    }
  }


}
