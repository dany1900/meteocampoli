import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PrevisioniComponent} from './previsioni.component';
import {IndiciClimaticiComponent} from './indici-climatici/indici-climatici.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'indici-climatici',
            component: IndiciClimaticiComponent,
          },
          {
            path: '',
            component: PrevisioniComponent,
          },
],
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class PrevisioniRoutingModule {
}
