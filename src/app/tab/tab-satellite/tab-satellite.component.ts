import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'tab-satellite',
  templateUrl: './tab-satellite.component.html',
  styleUrls: ['./tab-satellite.component.css']
})
export class TabSatelliteComponent {

  id: number;
  private path: any;
  isGenerali: boolean = false;
  isCentroItalia: boolean = false;
  isNordItalia: boolean = false;
  isSudItalia: boolean = false;
  isProtezioneCivile: boolean = false;

  constructor(private route: ActivatedRoute) {
    let paramTab: any;
    this.path = this.route.url;
    paramTab = this.path._value[1].path;
    switch (paramTab) {
      case "generale":
        this.id = 0;
        break;
      case "centro-italia":
        this.id = 1;
        break;
      case "nord-italia":
        this.id = 2;
        break;
      case "sud-italia":
        this.id = 3;
        break;
      case "protezione-civile":
        this.id = 4;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.isGenerali = true;
    }
    else if (event === 1) {
      this.isCentroItalia = true;
    }
    else if (event === 2) {
      this.isNordItalia = true;
    }
    else if (event === 3) {
      this.isSudItalia = true;
    }
    else if (event === 4) {
      this.isProtezioneCivile = true;
    }
  }
}


