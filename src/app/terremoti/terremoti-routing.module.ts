import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabTerremotiComponent} from './tab-terremoti/tab-terremoti.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'italia',
            component: TabTerremotiComponent
          },
          {
            path: 'mondo',
            component: TabTerremotiComponent,
          },
          {
            path: 'informazioni',
            component: TabTerremotiComponent,
          }
        ],
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class TerremotiRoutingModule {
}
