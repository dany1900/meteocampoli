import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'tab-stazioni',
  templateUrl: './tab-stazioni.component.html',
  styleUrls: ['./tab-stazioni.component.css']
})
export class TabStazioniComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedIndex: number | null;
  id: number;
  private _route: Subscription;
  isGenerali = false;
  isLazio = false;
  isAbruzzo = false;
  isMolise = false;
  isReteMeteo = false;
  pathGenerale = '/stazioni-meteo/generale';
  pathLazio = '/stazioni-meteo/lazio';
  pathAbruzzo = '/stazioni-meteo/abruzzo';
  pathMolise = '/stazioni-meteo/molise';
  pathReteMeteo = '/stazioni-meteo/rete-meteo';

  constructor(private route: Router, private myElement: ElementRef) {
    let paramTab: any;
    paramTab = this.route.url;
    switch (paramTab) {
      case this.pathGenerale:
        this.id = 0;
        break;
      case this.pathLazio:
        this.id = 1;
        break;
      case this.pathAbruzzo:
        this.id = 2;
        break;
      case this.pathMolise:
        this.id = 3;
        break;
      case this.pathReteMeteo:
        this.id = 4;
        break;
      default:
        this.id = 0;
        break;
    }
    this.tabSelectionChanged(this.id);
  }

  ngOnInit() {
    const el = this.myElement.nativeElement.querySelector('mat-tab-group');
    el.scrollIntoView();
  }

  ngOnChanges() {
  }

  tabSelectionChanged(event) {
    if (event === 0) {
      this.route.navigate([this.pathGenerale]);
    } else if (event === 1) {
      this.route.navigate([this.pathLazio]);
    } else if (event === 2) {
      this.route.navigate([this.pathAbruzzo]);
    } else if (event === 3) {
      this.route.navigate([this.pathMolise]);
    } else if (event === 4) {
      this.route.navigate([this.pathReteMeteo]);
    }
  }

  ngOnDestroy() {
    if (this._route) {
      this._route.unsubscribe();
    }
  }
}
