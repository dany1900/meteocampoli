import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-campania',
  templateUrl: './webcam-campania.component.html',
  styleUrls: ['./webcam-campania.component.css']
})
export class WebcamCampaniaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Campania Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam della campania montana ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.';
    this.keywords = 'webcam montagna campania, webcam sud italia montagna, webcam campania, webcam meteo campoli campania, webcam meteo campoli campania montagna';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/campania';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
