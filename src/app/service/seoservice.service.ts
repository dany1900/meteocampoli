import {Inject, Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private dom
  ) {
  }

  updateMetaInfo(title, description, keywords, url, image) {
    this.titleService.setTitle(title);
    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({name: 'keywords', content: keywords});
    this.meta.updateTag({property: 'og:locale', content: 'it_IT'});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: title});
    this.meta.updateTag({property: 'og:description', content: description});
    this.meta.updateTag({property: 'og:site_name', content: 'www.meteocampoli.altervista.org'});
    this.meta.updateTag({property: 'og:url', content: url});
    this.meta.updateTag({property: 'og:image', content: image});
  }

  // non usato
  updateTitle(title?: string) {
    if (!title) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map((route) => {
            while (route.firstChild) {
              route = route.firstChild;
            }
            return route;
          }),
          filter((route) => route.outlet === 'primary'),
          mergeMap((route) => route.data)).subscribe((event) => {
        this.titleService.setTitle(event['title'] + ' | Site name');
      });
    } else {
      this.titleService.setTitle(title + ' | Site name');
    }
  }

  setCanonicalURL(url?: string) {
    const canURL = url === undefined ? this.dom.URL : url;
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }

  cleanCanonicalUrl() {
    const link: HTMLLinkElement[] = this.dom.getElementsByTagName('link');
    for (let i = 0; i < link.length; i++) {
      if (link[i].rel && link[i].rel.includes('canonical')) {
        this.dom.head.removeChild(link[i]);
      }
    }
  }
}
