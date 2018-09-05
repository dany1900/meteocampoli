import { Component, OnInit } from '@angular/core';
import {SatTabComponent} from "../sat-tab.component";

@Component({
  selector: 'sat-generale',
  templateUrl: './satellite-generale.component.html',
  styleUrls: ['../sat-tab.component.css']
})

export class SatelliteGeneraleComponent extends SatTabComponent implements OnInit {
  //newcomponent = "Entered in new component created";



  ngOnInit() { }

  public show:boolean = false;
  public buttonName:any = 'Mostra';

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)
      this.buttonName = "Nascondi";
    else
      this.buttonName = "Mostra";
  }

}
