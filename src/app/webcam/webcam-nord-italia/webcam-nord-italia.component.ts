import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'webcam-nord-italia',
  templateUrl: './webcam-nord-italia.component.html',
  styleUrls: ['./webcam-nord-italia.component.css']
})
export class WebcamNordItaliaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Nord Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam del nord italia montanare ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Disponibilita di focus e zoom.';
    this.keywords = 'webcam nord, webcam nord italia, webcam nord meteo campoli, webcam nord montagna, webcam nord italia meteo campoli,web cam nord italia montagna,webcam nord montagna,web cam dolomiti,webcam alpi';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/nord-italia';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
  }

}
