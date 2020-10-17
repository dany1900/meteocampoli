import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pathGenerale = '/satellite/generale';
  pathCentroItalia = '/satellite/centro-italia';
  pathNordItalia = '/satellite/nord-italia';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (environment.production && location.protocol === 'https:') {
      window.location.href = location.href.replace('https', 'http');
    }

    /* if (environment.production) {
      this.router.events.filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          if (event instanceof RouterEvent) {
            const currentRoute = event.url;
            if (!this.isConvertibleHttps(currentRoute) && location.protocol === 'https:') {
              window.location.href = location.href.replace('https', 'http');
              console.warn(event + 'path uguale a generale');
            } else if (this.isConvertibleHttps(currentRoute) && location.protocol === 'http:') {
              window.location.href = location.href.replace('http', 'https');
              console.warn(event + 'path diverso da generale');
            }
          }
        });
    } */
  }

  /*
  isConvertibleHttps(currentRoute: string): boolean {
    return !(currentRoute === this.pathGenerale || currentRoute === this.pathCentroItalia || currentRoute === this.pathNordItalia);
  }
  */
}
