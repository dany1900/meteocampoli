import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-sicilia',
  templateUrl: './webcam-sicilia.component.html',
  styleUrls: ['./webcam-sicilia.component.css']
})
export class WebcamSiciliaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Sicilia Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam della sicilia montana ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.';
    this.keywords = 'webcam montagna sicilia, webcam sud italia montagna, webcam isole, webcam sicilia, webcam meteo campoli sicilia, webcam meteo campoli sicilia montagna,webcam campocatino';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/sicilia';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
