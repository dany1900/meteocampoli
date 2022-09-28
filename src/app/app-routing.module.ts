import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageErrorComponent} from './page-error/page-error.component';

export const routes: Routes = [
  {path: '', redirectTo: '/dati-attuali', pathMatch: 'full'},
  // tslint:disable-next-line:max-line-length
  {
    path: 'dati-attuali',
    loadChildren: () => import(`./dati-attuali/dati-attuali.module`).then(m => m.DatiAttualiModule),
    runGuardsAndResolvers: 'always'
  },
  {path: 'riepilogo', loadChildren: () => import(`./riepilogo/riepilogo.module`).then(m => m.RiepilogoModule)},
  {path: 'stazioni-meteo', loadChildren: () => import(`./stazioni-meteo/stazioni-meteo.module`).then(m => m.StazioniMeteoModule)},
  {path: 'previsioni', loadChildren: () => import(`./previsioni/previsioni.module`).then(m => m.PrevisioniModule)},
  {
    path: 'satellite',
    loadChildren: () => import(`./satellite/satellite.module`).then(m => m.SatelliteModule),
    runGuardsAndResolvers: 'always'
  },
  {path: 'webcam', loadChildren: () => import(`./webcam/webcam.module`).then(m => m.WebCamModule)},
  {path: 'terremoti', loadChildren: () => import(`./terremoti/terremoti.module`).then(m => m.TerremotiModule)},
  {path: 'info', loadChildren: () => import(`./info/info.module`).then(m => m.InfoModule)},
  {path: 'index.htm', redirectTo: '/dati-attuali', pathMatch: 'full'},
  {path: 'riepilogo.htm', redirectTo: '/riepilogo', pathMatch: 'full'},
  {path: 'temperature-meteonetwork.html', redirectTo: '/stazioni-meteo/generale', pathMatch: 'full'},
  {path: 'temperature.htm', redirectTo: '/stazioni-meteo/generale', pathMatch: 'full'},
  {path: 'lazio.html', redirectTo: '/stazioni-meteo/lazio', pathMatch: 'full'},
  {path: 'abruzzo.html', redirectTo: '/stazioni-meteo/abruzzo', pathMatch: 'full'},
  {path: 'molise.html', redirectTo: '/stazioni-meteo/molise', pathMatch: 'full'},
  {path: 'stazioni-meteo/umbria-marche', redirectTo: '/stazioni-meteo/umbria', pathMatch: 'full'},
  {path: 'retemeteo.html', redirectTo: '/stazioni-meteo/rete-meteo', pathMatch: 'full'},
  {path: 'thisyear.htm', redirectTo: '/previsioni', pathMatch: 'full'},
  {path: 'images.htm', redirectTo: '/webcam/immagini', pathMatch: 'full'},
  {path: 'webcam.htm', redirectTo: '/webcam/montagna/lazio', pathMatch: 'full'},
  {path: 'webcam1.htm', redirectTo: '/webcam/limitrofe', pathMatch: 'full'},
  {path: 'webcam-lazio.html', redirectTo: '/webcam/montagna/lazio', pathMatch: 'full'},
  {path: 'webcam-abruzzo.html', redirectTo: '/webcam/montagna/abruzzo', pathMatch: 'full'},
  {path: 'webcam-umbro-marchigiane.html', redirectTo: '/webcam/montagna/umbria', pathMatch: 'full'},
  {path: 'webcam-molise.html', redirectTo: '/webcam/montagna/molise', pathMatch: 'full'},
  {path: 'webcam/montagna/isole', redirectTo: '/webcam/montagna/sardegna', pathMatch: 'full'},
  {path: 'webcam/nord-italia', redirectTo: '/webcam/montagna/nord-est', pathMatch: 'full'},
  {path: 'webcam/sud-italia', redirectTo: '/webcam/montagna/sud-italia', pathMatch: 'full'},
  {path: 'satellite.htm', redirectTo: '/satellite/generale', pathMatch: 'full'},
  {path: 'satellite-centro.html', redirectTo: '/satellite/centro-italia', pathMatch: 'full'},
  {path: 'satelliteCentro.html', redirectTo: '/satellite/centro-italia', pathMatch: 'full'},
  {path: 'satellite-nord.html', redirectTo: '/satellite/nord-italia', pathMatch: 'full'},
  {path: 'satellite-sud.html', redirectTo: '/satellite/sud-italia', pathMatch: 'full'},
  {path: 'satellite/isole', redirectTo: '/satellite/sardegna', pathMatch: 'full'},
  {path: 'terremoti.html', redirectTo: '/terremoti/italia', pathMatch: 'full'},
  {path: 'terremoti-italia.html', redirectTo: '/terremoti/italia', pathMatch: 'full'},
  {path: 'terremoti-mondo.html', redirectTo: '/terremoti/mondo', pathMatch: 'full'},
  {path: 'infos.htm', redirectTo: '/info/curiosita', pathMatch: 'full'},
  {path: 'effemeridi.htm', redirectTo: '/info/effemeridi', pathMatch: 'full'},
  {path: 'sole-monitoraggio.html', redirectTo: '/info/effemeridi', pathMatch: 'full'},
  {path: 'ondata-caldo-2017.html', redirectTo: 'info/curiosita/ondata-caldo-2017', pathMatch: 'full'},
  {path: '**', component: PageErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', initialNavigation: 'enabledNonBlocking'})],
  exports: [RouterModule]
})

export class AppRoutingModule implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }
}
