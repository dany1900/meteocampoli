import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'webcam-marche',
  templateUrl: './webcam-marche.component.html',
  styleUrls: ['./webcam-marche.component.css']
})
export class WebcamMarcheComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'WebCam Marche Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam marche di montagna ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Focus sull\'appennino con link alle migliori fonti.';
    this.keywords = 'webcam marche, webcam marche meteo campoli, webcam marche montagna, webcam appennino meteo campoli,web cam centro italia montagna,webcam marche montagna';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/marche';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
