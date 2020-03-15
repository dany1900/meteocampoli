import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  @Input('iconWebcam') iconWebcam = {
    MONTAGNA: 'WebCam Montagna',
    LIMITROFE: 'WebCam Limitrofe',
    LAZIO: 'WebCam Lazio',
    ABRUZZO: 'WebCam Abruzzo',
    MOLISE: 'WebCam Molise',
    TOSCANA: 'WebCam Toscana',
    UMBRIA: 'WebCam Umbria',
    MARCHE: 'WebCam Marche',

  };

  footerTitle = 'Le immagini sono prese ad intervalli regolari';

  constructor() {
  }

  ngOnInit() {
  }

}
