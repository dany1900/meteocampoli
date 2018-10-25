import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RouterModule, Router} from '@angular/router';


@Component({
  selector: 'tab-satellite',
  templateUrl: './tab-satellite.component.html',
  styleUrls: ['./tab-satellite.component.css']
})
export class TabSatelliteComponent  {

  navLinks:any[];
  activeLinkIndex = 0;




  constructor(private router: Router) {
    this.navLinks = [
      {label: 'Welcome', link: 'welcome'},
      {label: 'Home', link: 'home'}];



  this.activeLinkIndex =
    this.navLinks.indexOf(this.navLinks.find(tab => router.url.indexOf(tab.link) != -1));
    }

  }


