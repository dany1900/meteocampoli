import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Rx";
import {StazioniMeteoCostants} from 'app/shared/constants/stazioni-meteo.constants'

@Component({
  selector: 'tab-stazioni',
  templateUrl: './tab-stazioni.component.html',
  styleUrls: ['./tab-stazioni.component.css']
})
export class TabStazioniComponent implements OnInit, OnDestroy {

  _stazioni: StazioniMeteoCostants;

  private tipo: string;
  id: number;
  private _route: Subscription;
  private path: any;
  isGenerali: boolean = false;
  isLazio: boolean = false;
  isAbruzzo: boolean = false;
  isMolise: boolean = false;
  isReteMeteo: boolean = false;

  constructor(private route: ActivatedRoute) {


    /* utile nel caso di param messo nel routing
    this._route = this.route.params.subscribe(
      (params : Params) => {
        this.tipo = params["tipo"]; // cast to number

      }
    );
*/
    let paramTab: any;
    this.path = this.route.url;
    paramTab = this.path._value[1].path;
    console.warn(this.path);
    switch (paramTab) {
      case "generale":
        this.id = 0;
        break;
      case "lazio":
        this.id = 1;
        break;
      case "abruzzo":
        this.id = 2;
        break;
      case "molise":
        this.id = 3;
        break;
      case "meteonetwork":
        this.id = 4;
        break;
      case "rete-meteo":
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
    if (this._route) this._route.unsubscribe();
  }

  @Input() selectedIndex: number | null;

}
