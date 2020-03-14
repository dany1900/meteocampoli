import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from "rxjs/Rx";
import {StazioniMeteoCostants} from 'app/shared/constants/stazioni-meteo.constants'

@Component({
  selector: 'tab-stazioni',
  templateUrl: './tab-stazioni.component.html',
  styleUrls: ['./tab-stazioni.component.css']
})
export class TabStazioniComponent implements OnInit , OnDestroy {

  _stazioni: StazioniMeteoCostants;

  private tipo : string;
   id : number;
  private _route : Subscription;
private  path: any;


  constructor(private route : ActivatedRoute) {


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

  }

  ngOnInit() {
  }



  ngOnDestroy() {
    if(this._route) this._route.unsubscribe();
  }

  @Input()selectedIndex: number | null;

}
