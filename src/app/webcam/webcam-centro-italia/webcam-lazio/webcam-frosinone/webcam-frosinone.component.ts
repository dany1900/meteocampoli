import {Component, OnInit} from '@angular/core';
import {WebcamComponent} from '../../../webcam.component';
import {ModalComponent} from '../../../../modal/modal.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'webcam-frosinone',
  templateUrl: './webcam-frosinone.component.html',
  styleUrls: ['./webcam-frosinone.component.css']
})
export class WebcamFrosinoneComponent extends WebcamComponent implements OnInit {

  imageLoader = true;

  constructor(private matDialog: MatDialog) {
    super();
  }

  ngOnInit() {
  }

  openModal(url: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '60%';
    dialogConfig.data = url;
    this.matDialog.open(ModalComponent, dialogConfig);
  }


}
