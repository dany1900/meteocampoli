import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 public keywords : string;
  description: string;
  ogLocale: string;
  ogType: string;
  ogDescription: string;
  ogTitle: string;
  ogSiteName: string

  constructor() { }



  ngOnInit() {
  }

}
