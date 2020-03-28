import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';

@Component({
  selector: 'immagini',
  templateUrl: './immagini.component.html',
  styleUrls: ['./immagini.component.css']
})
export class ImmaginiComponent implements OnInit {

  imageLoader = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService) {
    this.title = 'Immagini e WebCam - Meteo Campoli';
    this.description = 'Immagini di Campoli Appennino, paese della Valle di Comino. Tutte le Webcam del centro italia montano e limitrofe, ordinate per regione e localita.';
    this.keywords = 'immagini meteo campoli, immagini campoli, immagini stazioni meteo campoli, meteo campoli images, immagini e webcam meteo campoli, webcam meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/immagini';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
  }

  ngOnInit() {
  }

}
