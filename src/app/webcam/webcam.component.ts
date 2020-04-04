import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';

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


  constructor(private matDialog: MatDialog) {
  }

  ngOnInit() {
  }

  openModal(url: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '60%';
    dialogConfig.data = url;
    dialogConfig.autoFocus = true;
    this.matDialog.open(ModalComponent, dialogConfig);
  }

  errorHandler(event) {
    this.urlWebcam = 'www.meteocampoli.altervista.org/assets/img/webcam-offline.png';
    this.imageLoader = false;
  }

}
