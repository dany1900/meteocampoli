import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtiliyService} from '../../../service/utiliy.service';
import {SEOService} from '../../../service/seoservice.service';

@Component({
  selector: 'webcam-emilia-romagna',
  templateUrl: './webcam-emilia-romagna.component.html',
  styleUrls: ['./webcam-emilia-romagna.component.css']
})
export class WebcamEmiliaRomagnaComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'WebCam Emilia Romagna Montagna - Meteo Campoli';
    this.description = 'Tutte le Webcam dell Emilia Romagna montanare ordinate per localita. Descrizione e altitudine facilmente visualizzabili. Disponibilita di focus e zoom.';
    this.keywords = 'webcam Emilia Romagna, webcam Emilia Romagna italia, webcam Emilia Romagna meteo campoli, webcam Emilia Romagna montagna, webcam Emilia Romagna italia meteo campoli,web cam Emilia Romagna italia montagna,webcam Emilia Romagna montagna';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/montagna/emilia-romagna';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }
}
