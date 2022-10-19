import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-basilicata',
  templateUrl: './webcam-basilicata.component.html',
  styleUrls: ['./webcam-basilicata.component.css']
})
export class WebcamBasilicataComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Basilicata Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam della basilicata montana ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.';
    this.keywords = 'webcam montagna basilicata, webcam sud italia montagna, webcam basilicata, webcam meteo campoli basilicata, webcam meteo campoli basilicata montagna';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/basilicata';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
