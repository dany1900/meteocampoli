import {NgModule} from '@angular/core';
import {ArticoliRoutingModule} from './articoli.routing.module';
import {SharedModule} from '../shared/shared.module';
import {InfoModule} from '../info/info.module';


@NgModule({
  imports: [
    ArticoliRoutingModule,
    SharedModule,
    InfoModule
  ],

  declarations: [],
  exports: []
})
export class ArticoliModule {

  constructor() {
  }

}
