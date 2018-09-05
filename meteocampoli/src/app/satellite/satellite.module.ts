import {SatelliteCentroComponent} from "./centro-italia/satellite-centro.component";
import {SatelliteGeneraleComponent} from "./generale/satellite-generale.component";
import {SatelliteNordComponent} from "./nord-italia/satellite-nord.component";
import {SatelliteSudComponent} from "./sud-italia/satellite-sud.component";
import {TabSatelliteComponent} from "../tab/tab-satellite/tab-satellite.component";
import {NgModule} from "@angular/core";



@NgModule({
  imports: [

  ],
  declarations: [
    SatelliteCentroComponent,
    SatelliteGeneraleComponent,
    SatelliteNordComponent,
    SatelliteSudComponent,
    TabSatelliteComponent
  ]
})

export class AnagraficheModule {
  constructor() {
  }
}
