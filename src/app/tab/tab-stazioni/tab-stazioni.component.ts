import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tab-stazioni',
  templateUrl: './tab-stazioni.component.html',
  styleUrls: ['./tab-stazioni.component.css']
})
export class TabStazioniComponent implements OnInit, OnDestroy {
  id: number;
  private _route: Subscription;
  private path: any;
  isGenerali = false;
  isLazio = false;
  isAbruzzo = false;
  isMolise = false;
  isReteMeteo = false;
  @Input() selectedIndex: number | null;

  constructor(private route: ActivatedRoute) {
    let paramTab: any;
    this.path = this.route.url;
    paramTab = this.path._value[1].path;
    console.warn(this.path);
    switch (paramTab) {
      case 'generale':
        this.id = 0;
        break;
      case 'lazio':
        this.id = 1;
        break;
      case 'abruzzo':
        this.id = 2;
        break;
      case 'molise':
        this.id = 3;
        break;
      case 'meteonetwork':
        this.id = 4;
        break;
      case 'rete-meteo':
        this.id = 5;
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
      this.isReteMeteo = true;
    }
  }

  ngOnDestroy() {
    if (this._route) {
      this._route.unsubscribe();
    }
  }
}
