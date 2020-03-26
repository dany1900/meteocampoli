import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'tab-info',
  templateUrl: './tab-info.component.html',
  styleUrls: ['./tab-info.component.css']
})
export class TabInfoComponent implements OnInit {

  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute) {

    this.router.events.filter(evt => evt instanceof NavigationEnd)
      .subscribe((event) => {
        const paramTab = this.route.firstChild.routeConfig.path;

        switch (paramTab) {
          case 'articoli':
            this.id = 0;
            break;
          case 'curiosita':
            this.id = 1;
            break;
          case 'effemeridi':
            this.id = 2;
            break;
          default:
            this.id = 0;
            break;
        }
      });
  }

  ngOnInit(): void {
  }

}
