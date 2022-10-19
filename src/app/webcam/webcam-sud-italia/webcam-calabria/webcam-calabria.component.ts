import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-calabria',
  templateUrl: './webcam-calabria.component.html',
  styleUrls: ['./webcam-calabria.component.css']
})
export class WebcamCalabriaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam calabria Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam della calabria montana ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Link alle migliori fonti.';
    this.keywords = 'webcam montagna calabria, webcam sud italia montagna, webcam calabria, webcam meteo campoli calabria, webcam meteo campoli calabria montagna';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/calabria';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
