import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'webcam-lazio',
  templateUrl: './webcam-lazio.html',
  styleUrls: ['./webcam-lazio.css']
})
export class WebcamLazioComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Lazio Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam del lazio montano ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.';
    this.keywords = 'webcam montagna lazio, webcam centro italia montagna, webcam lazio, webcam meteo campoli lazio, webcam meteo campoli lazio montagna,webcam campocatino';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/lazio';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
  }
}
