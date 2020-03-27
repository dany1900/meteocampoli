import {NgModule} from '@angular/core';
import {InfoRoutingModule} from './info.routing.module';
import {SharedModule} from '../shared/shared.module';
import {TabInfoComponent} from './tab-info/tab-info.component';
import {CuriositaComponent} from './curiosita/curiosita.component';
import {ArticoliComponent} from './articoli/articoli.component';
import {EffemeridiComponent} from './effemeridi/effemeridi.component';
import {InquinamentoRimediComponent} from './articoli/inquinamento-rimedi/inquinamento-rimedi.component';
import {InfoAngularComponent} from '../info-angular/info-angular.component';


@NgModule({
  imports: [
    InfoRoutingModule,
    SharedModule
  ],

  declarations: [
    CuriositaComponent,
    ArticoliComponent,
    EffemeridiComponent,
    TabInfoComponent,
    InquinamentoRimediComponent,
    InfoAngularComponent
  ],
  exports: []
})
export class InfoModule {

  constructor() {
  }

}
