import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'publicita',
  templateUrl: './publicita.component.html',
  styleUrls: ['./publicita.component.css']
})
export class PublicitaComponent implements OnInit {

  isMobile = false;

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }
}
