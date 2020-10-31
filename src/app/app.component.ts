import {AfterViewInit, Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  pathGenerale = '/satellite/generale';
  pathCentroItalia = '/satellite/centro-italia';
  pathNordItalia = '/satellite/nord-italia';


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (environment.production && location.protocol === 'https:') {
      window.location.href = location.href.replace('https', 'http');
    }
  }

  ngAfterViewInit() {
    //this.initGoogleAnalyticsPageView();
  }

  private initGoogleAnalyticsPageView() {
    const interval = setInterval(() => {
      if ((window as any).ga && (window as any).ga.getAll) {
        this.router.events.subscribe(event => {
          const ga = (window as any).ga;
          if (event instanceof NavigationEnd) {
            const tracker = ga.getAll()[0];
            tracker.set('page', event.urlAfterRedirects);
            tracker.send('pageview');
          }
        });
        clearInterval(interval);
      }
    }, 50);
  }

  /*
  isConvertibleHttps(currentRoute: string): boolean {
    return !(currentRoute === this.pathGenerale || currentRoute === this.pathCentroItalia || currentRoute === this.pathNordItalia);
  }
  */
}
