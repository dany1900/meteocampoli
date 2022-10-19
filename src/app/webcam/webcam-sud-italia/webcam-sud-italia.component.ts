import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'webcam-sud-italia',
  templateUrl: './webcam-sud-italia.component.html',
  styleUrls: ['./webcam-sud-italia.component.css']
})
export class WebcamSudItaliaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Sud  Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam del sud italia montanare ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Disponibilita di focus e zoom.';
    this.keywords = 'webcam sud, webcam sud italia, webcam sud meteo campoli, webcam sud montagna, webcam sud italia meteo campoli,web cam sud italia montagna,webcam sud montagna,webcam sardegna,webcam sardegna montagna, webcam sardegna';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/sud-italia';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
  }

}
