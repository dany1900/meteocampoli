import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {NgModule} from '@angular/core';
import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

export const routes: Routes = [
  {path: '', redirectTo: 'dati-attuali', pathMatch: 'full', data: {title: 'Meteo Campoli - Monitoraggio Meteo',}},
  {path: 'dati-attuali', loadChildren: './dati-attuali/dati-attuali.module#DatiAttualiModule'},
  {path: 'riepilogo', loadChildren: './riepilogo/riepilogo.module#RiepilogoModule'},
  {path: 'stazioni-meteo', loadChildren: './stazioni-meteo/stazioni-meteo.module#StazioniMeteoModule'},
  {path: 'previsioni', loadChildren: './previsioni/previsioni.module#PrevisioniModule'},
  {path: 'satellite', loadChildren: './satellite/satellite.module#SatelliteModule'},
  {path: 'webcam', loadChildren: './webcam/webcam.module#WebCamModule'},
  {path: 'terremoti', loadChildren: './terremoti/terremoti.module#TerremotiModule'},
  {path: 'info', loadChildren: './info/info.module#InfoModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {
  }
}
