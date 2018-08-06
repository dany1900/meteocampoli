import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-cmp',
  templateUrl: './satellite.component.html',
  //styleUrls: ['./riepilogo.component.css']
})

export class SatelliteComponent implements OnInit {
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
