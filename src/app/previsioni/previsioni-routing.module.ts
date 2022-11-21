import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PrevisioniComponent} from './previsioni.component';
import {IndiciClimaticiComponent} from './indici-climatici/indici-climatici.component';
import {TabModelliConfrontoComponent} from './modelli-confronto/tab-modelli-confronto/tab-modelli-confronto.component';
import {ModelliCostants, ModelliTypeCostants} from '../shared/constants/stazioni-meteo.constants';


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
          {
            path: 'gfs/500Hpa',
            data: {
              modello: ModelliCostants.GFS,
              tipo: ModelliTypeCostants.HPA_500
            },
            component: TabModelliConfrontoComponent,
          },
          {
            path: 'gfs/850Hpa',
            data: {
              modello: ModelliCostants.GFS,
              tipo: ModelliTypeCostants.HPA_850
            },
            component: TabModelliConfrontoComponent,
          },
          {
            path: 'gfs/precipitazioni',
            data: {
              modello: ModelliCostants.GFS,
              tipo: ModelliTypeCostants.PRECIPITAZIONI
            },
            component: TabModelliConfrontoComponent,
          },
          {
            path: 'ecmwf/500Hpa',
            data: {
              modello: ModelliCostants.ECMWF,
              tipo: ModelliTypeCostants.HPA_500
            },
            component: TabModelliConfrontoComponent,
          },
          {
            path: 'ecmwf/850Hpa',
            data: {
              modello: ModelliCostants.ECMWF,
              tipo: ModelliTypeCostants.HPA_850
            },
            component: TabModelliConfrontoComponent,
          },
          {
            path: 'ecmwf/precipitazioni',
            data: {
              modello: ModelliCostants.ECMWF,
              tipo: ModelliTypeCostants.PRECIPITAZIONI
            },
            component: TabModelliConfrontoComponent,
          },
          {
            path: 'gem/500Hpa',
            data: {
              modello: ModelliCostants.GEM,
              tipo: ModelliTypeCostants.HPA_500
            },
            component: TabModelliConfrontoComponent,
          },
          {
            path: 'gem/850Hpa',
            data: {
              modello: ModelliCostants.GEM,
              tipo: ModelliTypeCostants.HPA_850
            },
            component: TabModelliConfrontoComponent,
          },
          {
            path: 'gem/precipitazioni',
            data: {
              modello: ModelliCostants.GEM,
              tipo: ModelliTypeCostants.PRECIPITAZIONI
            },
            component: TabModelliConfrontoComponent,
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
