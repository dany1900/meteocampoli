import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-puglia',
  templateUrl: './webcam-puglia.component.html',
  styleUrls: ['./webcam-puglia.component.css']
})
export class WebcamPugliaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Puglia Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam della puglia ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.';
    this.keywords = 'webcam montagna puglia, webcam puglia, webcam meteo campoli puglia, webcam meteo campoli puglia';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/puglia';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
