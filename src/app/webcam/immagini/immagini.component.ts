import {Component, OnInit} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ModalComponent} from '../../modal/modal.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {UtiliyService} from '../../service/utiliy.service';

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


  constructor(private seo: SEOService, public matDialog: MatDialog, private deviceService: DeviceDetectorService, public utilityService: UtiliyService) {
    this.title = 'Immagini e WebCam - Meteo Campoli';
    this.description = 'Immagini di Campoli Appennino, paese della Valle di Comino. Tutte le Webcam del centro italia montano e limitrofe, ordinate per regione e localita.';
    this.keywords = 'immagini meteo campoli, immagini campoli, immagini stazioni meteo campoli, meteo campoli images, immagini e webcam meteo campoli, webcam meteo campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/webcam/immagini';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
  }

  openModal(url: string) {
    if (!this.deviceService.isMobile()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'modal-component';
      dialogConfig.width = '95%';
      dialogConfig.height = '100%';
      dialogConfig.data = url;
      // dialogConfig.maxHeight = '100vh';
      dialogConfig.maxWidth = 'none';
      dialogConfig.panelClass = 'full-screen-modal';
      dialogConfig.autoFocus = true;
      this.matDialog.open(ModalComponent, dialogConfig);
    } else {
      window.location.href = url;
    }
  }

}
