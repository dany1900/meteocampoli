import {SharedModule} from '../shared/shared.module';
import {TerremotiItaliaComponent} from './terremoti-italia/terremoti-italia.component';
import {TerremotiComponent} from './terremoti.component';
import {NgModule} from '@angular/core';
import {TerremotiRoutingModule} from './terremoti-routing.module';


@NgModule({
  imports: [
    TerremotiRoutingModule,
    SharedModule
  ],

  declarations: [
    TerremotiComponent,
    TerremotiItaliaComponent
  ],
  exports: []
})
export class TerremotiModule {

  constructor() {
  }

}
