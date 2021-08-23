import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  link: string;

  constructor(protected router: Router) {
    this.link = this.router.url;
    console.warn(this.link);
  }


  ngOnInit() {
  }

}
