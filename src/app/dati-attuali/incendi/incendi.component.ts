import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'incendi',
  templateUrl: './incendi.html',
  styleUrls: ['./incendi.css']
})
export class IncendiComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  link: string;
  month: string;

  //myAngularxQrCode: string;


  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Mappa Incendi Live - Meteo Campoli';
    this.description = 'Mappa degli incendi in tempo reale dettagliata e facilmente utilizzabile.';
    this.keywords = 'incendi meteo campoli, mappa incendi, incendi, incendi italia, incendi live italia, incendi lazio ';
    this.ogUrl = 'www.meteocampoli.altervista.org/dati-attuali/incendi';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.link = 'https://www.geamap.com/it/fuochi#zoom=10&lat=41.567&lon=13.685&layer=2&overlays=TTFFFFF&output=embed';
    //window.location.replace(this.link);
    //this.myAngularxQrCode = 'https://www.liceoluciopiccolo.edu.it/e-teacher/italiano/Alessandro_Manzoni.pdf';
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
  }


}
