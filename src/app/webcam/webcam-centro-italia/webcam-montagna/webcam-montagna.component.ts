import {Component, ElementRef, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'webcam-montagna',
  templateUrl: './webcam-montagna.component.html',
  styleUrls: ['./webcam-montagna.component.css']
})
export class WebcamMontagnaComponent implements OnInit {

  footerTitle: any;

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, private myElement: ElementRef, private scroll: ViewportScroller, protected router: Router) {
    this.title = 'WebCam Montagna Centro Italia - Meteo Campoli';
    this.description = 'Tutte le Webcam del centro italia montano ordinate per regione e localita. Descrizione e altitudine facilmente visualizzabili. Focus sulla valle di comino.';
    this.keywords = 'webcam montagna, webcam centro italia, webcam lazio,web cam abruzzo, webcam meteo campoli, webcam campoli, webcam campoli appennino,webcam rivisondoli,webcam passo godi,webcam ovindoli,webcam campotosto,webcam cappadocia';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
    this.footerTitle = 'Le immagini sono prese ad intervalli regolari';
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  indietro(): void {
    this.router.navigate([this.router.url.slice(0, this.router.url.lastIndexOf('/'))]);
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }


}
