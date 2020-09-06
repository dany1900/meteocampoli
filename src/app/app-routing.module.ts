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
  {path: 'index.htm', redirectTo: '/dati-attuali', pathMatch: 'full'},
  {path: 'riepilogo.htm', redirectTo: '/riepilogo', pathMatch: 'full'},
  {path: 'temperature-meteonetwork.html', redirectTo: '/stazioni-meteo/generale', pathMatch: 'full'},
  {path: 'temperature.htm', redirectTo: '/stazioni-meteo/generale', pathMatch: 'full'},
  {path: 'lazio.html', redirectTo: '/stazioni-meteo/lazio', pathMatch: 'full'},
  {path: 'abruzzo.html', redirectTo: '/stazioni-meteo/abruzzo', pathMatch: 'full'},
  {path: 'molise.html', redirectTo: '/stazioni-meteo/molise', pathMatch: 'full'},
  {path: 'retemeteo.html', redirectTo: '/stazioni-meteo/rete-meteo', pathMatch: 'full'},
  {path: 'thisyear.htm', redirectTo: '/previsioni', pathMatch: 'full'},
  {path: 'images.htm', redirectTo: '/webcam/immagini', pathMatch: 'full'},
  {path: 'webcam.htm', redirectTo: '/webcam/montagna/lazio', pathMatch: 'full'},
  {path: 'webcam1.htm', redirectTo: '/webcam/limitrofe', pathMatch: 'full'},
  {path: 'satellite.htm', redirectTo: '/satellite/generale', pathMatch: 'full'},
  {path: 'satellite-centro.html', redirectTo: '/satellite/centro-italia', pathMatch: 'full'},
  {path: 'satellite-nord.html', redirectTo: '/satellite/nord-italia', pathMatch: 'full'},
  {path: 'satellite-sud.html', redirectTo: '/satellite/sud-italia', pathMatch: 'full'},
  {path: 'terremoti.html', redirectTo: '/terremoti/italia', pathMatch: 'full'},
  {path: 'terremoti-italia.html', redirectTo: '/terremoti/italia', pathMatch: 'full'},
  {path: 'terremoti-mondo.html', redirectTo: '/terremoti/mondo', pathMatch: 'full'},
  {path: 'terremoti-mondo.html', redirectTo: '/terremoti/mondo', pathMatch: 'full'},
  {path: 'infos.htm', redirectTo: '/info/curiosita', pathMatch: 'full'},
  {path: 'ondata-caldo-2017.html', redirectTo: '/info/curiosita/ondata-caldo-2017', pathMatch: 'full'},
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
