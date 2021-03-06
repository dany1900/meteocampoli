import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'webcam-umbria',
  templateUrl: './webcam-umbria.component.html',
  styleUrls: ['./webcam-umbria.component.css']
})
export class WebcamUmbriaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Umbria Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam umbre di montagna ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Focus sull\'appennino con link alle migliori fonti.';
    this.keywords = 'webcam umbria, webcam umbria meteo campoli, webcam umbria montagna, webcam appennino meteo campoli,web cam centro italia montagna,webcam umbria montagna';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/umbria';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
  }
}
