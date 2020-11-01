import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'webcam-toscana',
  templateUrl: './webcam-toscana.component.html',
  styleUrls: ['./webcam-toscana.component.css']
})
export class WebcamToscanaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Toscana Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam toscane di montagna ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Focus sull\'appennino con link alle migliori fonti.';
    this.keywords = 'webcam toscana, webcam toscana meteo campoli, webcam toscana montagna, webcam appennino meteo campoli,web cam centro italia montagna,webcam toscana montagna';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/toscana';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
  }
}
