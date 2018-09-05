import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Device} from "../shared/models/device";

const INITIAL_STATE = { label: null, os: null };

@Component({
  selector: 'app-new-cmp',
  templateUrl: './home.component.html',
  //styleUrls: ['./new-cmp.component.css']
})

export class HomeComponent implements OnInit {


  newcomponent = "Entered in home component";
  //constructor() {}
  ngOnInit() { }

  devices: Device[];
  active: Device = INITIAL_STATE;

  constructor(private http: HttpClient) {
    // console.log ('environment:', env);
    this.getAll();
  }

  getAll() {
    this.http.get<Device[]>('http://localhost:3000/devices')
      .subscribe(result => this.devices = result);
  }

  setActive(device: Device) {
    this.active = device;
  }


  delete(event: MouseEvent, device: Device) {
    event.stopPropagation()
    this.http.delete<any>(`http://localhost:3000/devices/${device.id}`)
      .subscribe(
        () => {
          const index = this.devices.indexOf(device)
          this.devices.splice(index, 1);
        }
      );
  }

  save(form: NgForm) {
    if (this.active.id) {
      this.edit(form.value);
    } else {
      this.add(form.value);
      form.reset();
    }
  }

  add(device: Device) {
    this.http.post<Device>(`http://localhost:3000/devices`, device)
      .subscribe(res => {
        this.devices.push(res)
        this.reset();
      })
  }

  edit(device: Device) {
    const newDevice = Object.assign(
      {},
      this.active,
      device
    );

    this.http.patch<Device>(`http://localhost:3000/devices/${newDevice.id}`, newDevice )
      .subscribe(
        res => {
          const index = this.devices.findIndex(device => device.id === newDevice.id) ;
          this.devices[index] = newDevice;
        }
      );
  }

  reset() {
    this.active = INITIAL_STATE;
  }

}
