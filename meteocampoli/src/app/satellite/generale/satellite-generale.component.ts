import { Component, OnInit } from '@angular/core';
import {SatTabComponent} from "../sat-tab.component";

@Component({
  selector: 'satellite-generale',
  templateUrl: './satellite-generale.component.html',
  styleUrls: ['../sat-tab.component.css']
})

export class SatelliteGeneraleComponent extends SatTabComponent implements OnInit {
  //newcomponent = "Entered in new component created";



  ngOnInit() { }

  public show1:boolean = false;
  public show2:boolean = false;

  public buttonName:any = 'Mostra';

  toggle() {
    this.show1 = !this.show1;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show1)
      this.buttonName = "Nascondi";
    else
      this.buttonName = "Mostra";
  }

  test2() {
    this.show2 = !this.show2;


    if (this.show2)
      this.buttonName = "Nascondi";
    else
      this.buttonName = "Mostra";

  }
}
