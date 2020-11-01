import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'webcam-abruzzo',
  templateUrl: './webcam-abruzzo.component.html',
  styleUrls: ['./webcam-abruzzo.component.css']
})
export class WebcamAbruzzoComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Abruzzo Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam abruzzesi di montagna ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Focus sull\'appennino con link alle migliori fonti.';
    this.keywords = 'webcam abruzzo, webcam abruzzo meteo campoli, webcam abruzzo montagna, webcam appennino meteo campoli,web cam centro italia montagna,webcam abruzzo montagna,web cam villetta barrea,villetta barrea webcam,webcam barrea,webcam campofelice,webcam avezzano';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/abruzzo';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }
}
