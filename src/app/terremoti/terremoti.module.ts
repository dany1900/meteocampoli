import {SharedModule} from '../shared/shared.module';
import {TerremotiItaliaComponent} from './terremoti-italia/terremoti-italia.component';
import {TerremotiComponent} from './terremoti.component';
import {NgModule} from '@angular/core';
import {TerremotiRoutingModule} from './terremoti-routing.module';
import {TerremotiMondoComponent} from './terremoti-mondo/terremoti-mondo.component';
import {TabTerremotiComponent} from './tab-terremoti/tab-terremoti.component';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    TerremotiRoutingModule,
    SharedModule,
    CommonModule
  ],

  declarations: [
    TerremotiComponent,
    TerremotiItaliaComponent,
    TerremotiMondoComponent,
    TabTerremotiComponent
  ],
  exports: []
})
export class TerremotiModule {

  constructor() {
  }

}
