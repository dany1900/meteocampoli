import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-nord-ovest',
  templateUrl: './webcam-nord-ovest.component.html',
  styleUrls: ['./webcam-nord-ovest.component.css']
})
export class WebcamNordOvestComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Nord Ovest Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam del nord ovest italia montanare ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Disponibilita di focus e zoom.';
    this.keywords = 'webcam nord ovest, webcam nord ovest italia, webcam nord ovest meteo campoli, webcam nord ovest montagna, webcam nord ovest italia meteo campoli,web cam nord ovest italia montagna,webcam nord ovest montagna, web cam dolomiti, webcam alpi';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/nord-ovest';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
