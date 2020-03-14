import { Component, OnInit } from '@angular/core';
import {Meta} from "@angular/platform-browser";


@Component({
  selector: 'tab-sat',
  templateUrl: './sat-tab.component.html',
  styleUrls: ['./sat-tab.component.css']

})
export class SatTabComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: ''},
      {name: 'keywords', content: ''},
      {property: 'og:locale', content: 'it_IT'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: ''},
      {property: 'og:description', content: ''},
      {property: 'og:url', content: ''},
      {property: 'og:site_name', content: ''},
      {property: 'og:image', content: ''}
    ]);
  }
  ngOnInit() {
  }

}
