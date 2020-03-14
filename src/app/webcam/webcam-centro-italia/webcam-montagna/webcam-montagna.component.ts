import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'webcam-montagna',
  templateUrl: './webcam-montagna.component.html',
  styleUrls: ['./webcam-montagna.component.css']
})
export class WebcamMontagnaComponent implements OnInit {

  footerTitle: any;

  constructor() {


  }

  ngOnInit() {
    this.footerTitle="Le immagini sono prese ad intervalli regolari"

  }


}
