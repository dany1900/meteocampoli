import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {PageErrorComponent} from './page-error/page-error.component';
import {filter} from 'rxjs/internal/operators';
import {Title} from '@angular/platform-browser';

export const routes: Routes = [
  {path: '', redirectTo: '/dati-attuali', pathMatch: 'full'},
  {path: 'dati-attuali', loadChildren: './dati-attuali/dati-attuali.module#DatiAttualiModule'},
  {path: 'riepilogo', loadChildren: './riepilogo/riepilogo.module#RiepilogoModule'},
  {path: 'stazioni-meteo', loadChildren: './stazioni-meteo/stazioni-meteo.module#StazioniMeteoModule'},
  {path: 'previsioni', loadChildren: './previsioni/previsioni.module#PrevisioniModule'},
  {path: 'satellite', loadChildren: './satellite/satellite.module#SatelliteModule'},
  {path: 'webcam', loadChildren: './webcam/webcam.module#WebCamModule'},
  {path: 'terremoti', loadChildren: './terremoti/terremoti.module#TerremotiModule'},
  {path: 'info', loadChildren: './info/info.module#InfoModule'},
  {path: '**', component: PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule implements OnInit {


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title) {
  }

  ngOnInit() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {
        let rt = this.getChild(this.activatedRoute);
        rt.data.subscribe(data => {
          console.log(data);
          this.titleService.setTitle(data.title);
        });
      });
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }

}
