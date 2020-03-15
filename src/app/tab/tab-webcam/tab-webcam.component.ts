import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'tab-webcam',
  templateUrl: './tab-webcam.component.html',
  styleUrls: ['./tab-webcam.component.css']
})
export class TabWebcamComponent implements OnInit {

   id : number;
  private path: any;
  isGenerali: boolean = false;
  isLazio: boolean = false;
  isAbruzzo: boolean = false;
  isMolise: boolean = false;
  isUmbriaMarche: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.isGenerali = true;
    }
    else if (event === 1) {
      this.isLazio = true;
    }
    else if (event === 2) {
      this.isAbruzzo = true;
    }
    else if (event === 3) {
      this.isMolise = true;
    }
    else if (event === 4) {
      this.isUmbriaMarche = true;
    }
    // Get the selected tab
    let selectedTab = event.tab;
    console.log(selectedTab);
  }
}
