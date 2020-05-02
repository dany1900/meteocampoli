import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageErrorComponent} from './page-error/page-error.component';

export const routes: Routes = [
  {path: '', redirectTo: '/dati-attuali', pathMatch: 'full'},
  {path: 'dati-attuali', loadChildren: './dati-attuali/dati-attuali.module#DatiAttualiModule', runGuardsAndResolvers: 'always'},
  {path: 'riepilogo', loadChildren: './riepilogo/riepilogo.module#RiepilogoModule'},
  {path: 'stazioni-meteo', loadChildren: './stazioni-meteo/stazioni-meteo.module#StazioniMeteoModule'},
  {path: 'previsioni', loadChildren: './previsioni/previsioni.module#PrevisioniModule'},
  {path: 'satellite', loadChildren: './satellite/satellite.module#SatelliteModule', runGuardsAndResolvers: 'always'},
  {path: 'webcam', loadChildren: './webcam/webcam.module#WebCamModule'},
  {path: 'terremoti', loadChildren: './terremoti/terremoti.module#TerremotiModule'},
  {path: 'info', loadChildren: './info/info.module#InfoModule'},
  {path: '**', component: PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }
}
