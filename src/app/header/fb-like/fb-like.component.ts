import {AfterViewInit, Component, Input} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'fb-like-custom',
  template: `
    <div [attr.data-href]="url" class="fb-share-button" data-type="button"></div>`
})


export class FbLikeComponent implements AfterViewInit {
  @Input() url;

  constructor(private route: ActivatedRoute, private router: Router) {
    // initialise facebook sdk after it loads if required
    if (!window['fbAsyncInit']) {
      window['fbAsyncInit'] = function () {
        window['FB'].init({
          appId: 'your-app-id',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v3.0'
        });
      };
    }

    // load facebook sdk if required
    const url = 'https://connect.facebook.net/en_US/sdk.js';
    if (!document.querySelector(`script[src='${url}']`)) {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        this.url = location.href;
        if (this.url) {
          // load facebook sdk if required
          const url = 'https://connect.facebook.net/en_US/sdk.js';
          if (!document.querySelector(`script[src='${url}']`)) {
            const script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    // render facebook button
    window ['FB'] && window['FB'].XFBML.parse();
  }
}
