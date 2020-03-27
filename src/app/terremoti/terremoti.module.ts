import {SharedModule} from '../shared/shared.module';
import {TerremotiItaliaComponent} from './terremoti-italia/terremoti-italia.component';
import {TerremotiComponent} from './terremoti.component';
import {NgModule} from '@angular/core';
import {TerremotiRoutingModule} from './terremoti-routing.module';
import {TerremotiMondoComponent} from './terremoti-mondo/terremoti-mondo.component';
import {TabTerremotiComponent} from '../tab/tab-terremoti/tab-terremoti.component';


@NgModule({
  imports: [
    TerremotiRoutingModule,
    SharedModule
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
