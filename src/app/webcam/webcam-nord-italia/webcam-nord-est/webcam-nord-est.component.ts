import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-nord-est',
  templateUrl: './webcam-nord-est.component.html',
  styleUrls: ['./webcam-nord-est.component.css']
})
export class WebcamNordEstComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Nord Est Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam del nord est italia montanare ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Disponibilita di focus e zoom.';
    this.keywords = 'webcam nord est, webcam nord est italia, webcam nord est meteo campoli, webcam nord est montagna, webcam nord est italia meteo campoli,web cam nord est italia montagna,webcam nord est montagna,web cam dolomiti,webcam alpi';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/nord-est';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
