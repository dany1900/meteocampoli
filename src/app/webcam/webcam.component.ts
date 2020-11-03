import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  @Input() luogo: string;
  @Input() altitudine: string;
  @Input() urlSite: string;
  @Input() urlWebcam: string;
  imageLoader = true;


  constructor(private matDialog: MatDialog, private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
  }

  redirect() {
    window.open('http://' + this.urlSite, '_blank');
  }

  openModal(url: string) {
    if (!this.deviceService.isMobile()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'modal-component';
      dialogConfig.width = '100%';
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

  errorHandler() {
    this.urlWebcam = './assets/img/webcam-offline.png';
    this.imageLoader = false;
  }
}
