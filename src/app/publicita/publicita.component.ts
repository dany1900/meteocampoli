import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'publicita',
  templateUrl: './publicita.component.html',
  styleUrls: ['./publicita.component.css']
})
export class PublicitaComponent implements OnInit {

  isMobile: boolean;

  constructor(private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    }
  }

}
