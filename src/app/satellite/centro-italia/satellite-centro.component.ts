import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SEOService} from '../../service/seoservice.service';
import {UtiliyService} from '../../service/utiliy.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'satellite-centro',
  templateUrl: './satellite-centro.component.html',
  styleUrls: ['./satellite-centro.component.css']
})
export class SatelliteCentroComponent implements OnInit {

  imageLoader = true;
  imageLoaderMovimento = true;
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  urlSatellite: string;
  preventCache: number;
  imageToShow: any;
  isImageLoading: boolean;

  constructor(private seo: SEOService, public utilityService: UtiliyService, protected router: Router, private http: HttpClient) {
    this.title = 'Radar Precipitazioni Centro Italia - Satellite Meteo';
    this.description = 'Satellite infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale. Focus sul centro italia.';
    this.keywords = 'satellite centro meteo campoli, radar centro meteo campoli, radar precipitazioni centro italia meteo campoli, radar fulmini centro italia, radar precipitazioni zoom centro italia, radar pioggia centro italia, satellite centro italia, radar pioggie toscana';
    this.ogUrl = 'www.meteocampoli.altervista.org/satellite/centro-italia';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.preventCache = Math.random();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
    // this.getImageFromService();
    /*const frm = frames['iframe1'].document;
    const otherhead = frm.getElementsByTagName('head')[0];
    const css = '<style type="text/css">' +
      '#plugin-radar #radar-wrapper .sound-onoff, #plugin-radar #radar-wrapper .play-pause {font-size: 52px!important;\n' +
      '</style>';
    otherhead.append(css);*/
    //frames['iframe1'].document.head.append(css);
  }

  errorHandler() {
    this.urlSatellite = './assets/img/webcam-offline.png';
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, {responseType: 'blob'});
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() {
    this.isImageLoading = true;
    this.getImage('http://satollo.aquila.infn.it/midia/ref/ultimo.6.png').subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

}
