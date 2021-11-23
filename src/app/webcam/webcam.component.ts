import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {HttpClient} from '@angular/common/http';

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
  @Input() timeout: boolean = false;
  imageLoader = true;


  constructor(private matDialog: MatDialog, private deviceService: DeviceDetectorService, private http: HttpClient) {
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

  errorHandler(timeout: boolean) {
    if (timeout) {
      /*setInterval(function(){
        this.http.get(urlWebcam).subscribe(
          response => {
            this.urlWebcam = urlWebcam;
            this.imageLoader = false;
          },
          error => {
            setTimeout(function(){
              this.urlWebcam = './assets/img/webcam-offline.png';
              this.imageLoader = false;
            }, 1000);
          }
        );
      }, 1000);
      interval(1000)
        .pipe(takeWhile(() => !stop))
        .subscribe(() => {
          this.http.get(urlWebcam).subscribe(
            response => {
              this.urlWebcam = urlWebcam;
              console.log(urlWebcam);
              this.imageLoader = false;
            })
        }); */
    } else {
      this.urlWebcam = './assets/img/webcam-offline.png';
      this.imageLoader = false;
    }
  }
}
