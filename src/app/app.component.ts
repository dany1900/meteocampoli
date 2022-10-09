import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {SEOService} from './service/seoservice.service';
import {UtiliyService} from './service/utiliy.service';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  data: any;
  isMobile: boolean;

  constructor(private router: Router, private seo: SEOService, private activatedRoute: ActivatedRoute, private scroll: ViewportScroller, public utilityService: UtiliyService,
              private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    /*if (environment.production && location.protocol === 'https:') {
      window.location.href = location.href.replace('https', 'http');
    }*/
    this.scroll.scrollToPosition([0, 570]);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    }
    // this.data = this.getTestData();
    // console.log(this.data);
  }

  ngAfterViewInit() {
    this.initGoogleAnalyticsPageView();
  }

  /*
  getTestData() {
    return this._http.get('assets/php/head.php') // <-- Here
      .subscribe(
        (res: Response) => {
          this.data = res;
          console.log(this.data);
        },
        (err: Error) => console.log(err)
      );
  }
  */

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
