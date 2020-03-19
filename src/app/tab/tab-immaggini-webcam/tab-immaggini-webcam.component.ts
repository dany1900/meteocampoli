import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'tab-immaggini-webcam',
  templateUrl: './tab-immaggini-webcam.component.html',
  styleUrls: ['./tab-immaggini-webcam.component.css']
})
export class TabImmagginiWebcamComponent implements OnInit {

  id: number;
  private path: any;
  isMontagna = false;
  isLimitrofe = false;
  isImmagini = false;

  constructor(private route: ActivatedRoute) {
    let paramTab: any;
    this.path = this.route.url;
    paramTab = this.path._value[1].path;

    switch (paramTab) {
      case 'immagini':
        this.id = 0;
        break;
      case 'montagna':
        this.id = 1;
        break;
      case 'limitrofe':
        this.id = 2;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  ngOnInit() {

  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.isImmagini = true;
    }
    else if (event === 1) {
      this.isMontagna = true;
    }
    else if (event === 2) {
      this.isLimitrofe = true;
    }
  }


}
