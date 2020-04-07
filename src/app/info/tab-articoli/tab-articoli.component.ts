import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'tab-articoli',
  templateUrl: './tab-articoli.component.html',
  styleUrls: ['./tab-articoli.component.css']
})
export class TabArticoliComponent implements OnInit {

  id: number;
  isUlivi = false;
  isInquinamento = false;

  constructor(private router: Router,
              private route: ActivatedRoute) {

    this.router.events.filter(evt => evt instanceof NavigationEnd)
      .subscribe((event) => {
        const paramTab = this.route.firstChild.routeConfig.path;

        switch (paramTab) {
          case 'meteo':
            this.id = 0;
            break;
          case 'giardinaggio':
            this.id = 1;
            break;
          case 'inquinamento-rimedi':
            this.id = 2;
            this.isInquinamento = true;
            break;
          default:
            this.id = 0;
            break;
        }
        this.tabSelectionChanged(this.id);
      });
  }

  ngOnInit(): void {
  }

  tabSelectionChanged(id) {
    if (id === 2) {
      this.isInquinamento = true;
    }
  }
}
