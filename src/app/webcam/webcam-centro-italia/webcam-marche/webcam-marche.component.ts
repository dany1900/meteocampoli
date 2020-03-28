import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../../service/seoservice.service';

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

  constructor(private seo: SEOService) {
    this.title = 'WebCam Marche Montagna - Meteo Campoli';
    this.description = '';
    this.keywords = '';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/marche';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
  }

}
