import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'tab-satellite',
  templateUrl: './tab-satellite.component.html',
  styleUrls: ['./tab-satellite.component.css']
})
export class TabSatelliteComponent {

  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute) {

    this.router.events.filter(evt => evt instanceof NavigationEnd)
      .subscribe((event) => {
        const paramTab = this.route.firstChild.routeConfig.path;
        switch (paramTab) {
          case 'generale':
            this.id = 0;
            break;
          case 'centro-italia':
            this.id = 1;
            break;
          case 'nord-italia':
            this.id = 2;
            break;
          case 'sud-italia':
            this.id = 3;
            break;
          case 'protezione-civile':
            this.id = 4;
            break;
          case 'rete-nazionale':
            this.id = 5;
            break;
          default:
            this.id = 0;
            break;
        }
      });
  }
}


