import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-sardegna',
  templateUrl: './webcam-sardegna.component.html',
  styleUrls: ['./webcam-sardegna.component.css']
})
export class WebcamSardegnaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Sardegna Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam della sardegna montana ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.';
    this.keywords = 'webcam montagna sardegna, webcam isole italia montagna, webcam sardegna, webcam meteo campoli sardegna, webcam meteo campoli sardegna montagna,webcam campocatino';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/sardegna';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
