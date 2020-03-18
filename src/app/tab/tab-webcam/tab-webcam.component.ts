import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'tab-webcam',
  templateUrl: './tab-webcam.component.html',
  styleUrls: ['./tab-webcam.component.css']
})
export class TabWebcamComponent implements OnInit {

  isLazio = true;
  isAbruzzo = false;
  isMolise = false;
  isUmbria = false;
  isMarche = false;
  isToscana = false;

  constructor() {
  }

  ngOnInit() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.isLazio = true;
    }
    else if (event === 1) {
      this.isAbruzzo = true;
    }
    else if (event === 2) {
      this.isMolise = true;
    }
    else if (event === 3) {
      this.isUmbria = true;
    }
    else if (event === 4) {
      this.isMarche = true;
    }
    else if (event === 5) {
      this.isToscana = true;
    }
  }
}
