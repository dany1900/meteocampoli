import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'tab-stazioni',
  templateUrl: './tab-stazioni.component.html',
  styleUrls: ['./tab-stazioni.component.css']
})
export class TabStazioniComponent implements OnInit {
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
          case 'lazio':
            this.id = 1;
            break;
          case 'abruzzo':
            this.id = 2;
            break;
          case 'molise':
            this.id = 3;
            break;
          case 'meteonetwork':
            this.id = 4;
            break;
          case 'rete-meteo':
            this.id = 5;
            break;
          default:
            this.id = 0;
            break;
        }
      });
  }

  ngOnInit() {
  }
}
