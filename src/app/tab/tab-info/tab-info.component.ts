import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'tab-info',
  templateUrl: './tab-info.component.html',
  styleUrls: ['./tab-info.component.css']
})
export class TabInfoComponent implements OnInit {

  id: number;
  private path: any;
  isArticoli: boolean = false;
  isCuriosita: boolean = false;
  isEffemeridi: boolean = false;

  constructor(private route: ActivatedRoute) {
    let paramTab: any;
    this.path = this.route.url;
    paramTab = this.path._value[1].path;

    switch (paramTab) {
      case "articoli":
        this.id = 0;
        break;
      case "curiosita":
        this.id = 1;
        break;
      case "effemeridi":
        this.id = 2;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  ngOnInit(): void {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.isArticoli = true;
    }
    else if (event === 1) {
      this.isCuriosita = true;
    }
    else if (event === 2) {
      this.isEffemeridi = true;
    }
    // Get the selected tab
    //let selectedTab = event.tab;
  }

}
