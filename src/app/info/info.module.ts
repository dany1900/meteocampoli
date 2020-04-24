import {NgModule} from '@angular/core';
import {InfoRoutingModule} from './info.routing.module';
import {SharedModule} from '../shared/shared.module';
import {TabInfoComponent} from './tab-info/tab-info.component';
import {CuriositaComponent} from './curiosita/curiosita.component';
import {ArticoliComponent} from './articoli/articoli.component';
import {EffemeridiComponent} from './effemeridi/effemeridi.component';
import {InfoAngularComponent} from '../info-angular/info-angular.component';
import {TabArticoliComponent} from './tab-articoli/tab-articoli.component';
import {GiardinaggioComponent} from './articoli/giardinaggio/giardinaggio.component';
import {InquinamentoRimediComponent} from './articoli/meteo/inquinamento-rimedi/inquinamento-rimedi.component';
import {UliviComponent} from './articoli/giardinaggio/ulivi/ulivi.component';
import {PescheComponent} from './articoli/giardinaggio/pesche/pesche.component';
import {VitiComponent} from './articoli/giardinaggio/viti/viti.component';
import {AlbicoccheComponent} from './articoli/giardinaggio/albicocche/albicocche.component';
import {ArticoliMeteoComponent} from './articoli/meteo/articoli-meteo.component';


@NgModule({
  imports: [
    InfoRoutingModule,
    SharedModule,
  ],

  declarations: [
    CuriositaComponent,
    ArticoliComponent,
    ArticoliMeteoComponent,
    EffemeridiComponent,
    TabInfoComponent,
    InfoAngularComponent,
    TabArticoliComponent,
    GiardinaggioComponent,
    InquinamentoRimediComponent,
    UliviComponent,
    PescheComponent,
    VitiComponent,
    AlbicoccheComponent
  ],
  exports: []
})
export class InfoModule {

  constructor() {
  }

}
