import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';

@Component({
  selector: 'webcam-molise',
  templateUrl: './webcam-molise.component.html',
  styleUrls: ['./webcam-molise.component.css']
})
export class WebcamMoliseComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Molise Montagna - Meteo Campoli';
    this.description = 'Tutte le webcam  del molise visualizzabili con comodi script. Possibilita di accedere a tutte le statistiche sempre aggiornate. Link ai migliori siti.';
    this.keywords = 'webcam molise, webcam molise meteo campoli, webcam molise montagna, webcam appennino meteo campoli,web cam centro italia montagna,webcam molise montagna';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/molise';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
  }
}
