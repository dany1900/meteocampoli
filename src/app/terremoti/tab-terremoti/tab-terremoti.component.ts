import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SEOService} from '../../service/seoservice.service';

@Component({
  selector: 'tab-terremoti',
  templateUrl: './tab-terremoti.component.html',
  styleUrls: ['./tab-terremoti.component.css']
})
export class TabTerremotiComponent implements OnInit {
  @Input() selectedIndex: number | null;
  id: number;
  pathItalia = '/terremoti/italia';
  pathMondo = '/terremoti/mondo';
  pathInformazioni = '/terremoti/informazioni';

  constructor(private seo: SEOService, private myElement: ElementRef, protected router: Router) {
    let paramTab: any;
    paramTab = this.router.url;
    switch (paramTab) {
      case this.pathItalia:
        this.id = 0;
        break;
      case this.pathMondo:
        this.id = 1;
        break;
      case this.pathInformazioni:
        this.id = 2;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.router.navigate([this.pathItalia]);
    } else if (event === 1) {
      this.router.navigate([this.pathMondo]);
    } else if (event === 2) {
      this.router.navigate([this.pathInformazioni]);
    }
  }
}
