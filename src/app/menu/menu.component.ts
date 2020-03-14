import { Component, OnInit } from '@angular/core';
import {StazioniMeteoCostants} from 'app/shared/constants/stazioni-meteo.constants'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  stazioni: StazioniMeteoCostants;

  constructor() {



  }

  ngOnInit() {
  }

}
