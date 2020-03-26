import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {NgModule} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {DatiAttualiComponent} from './dati-attuali/dati-attuali.component';

export const routes: Routes = [


  {
    path: '',
    redirectTo: 'dati-attuali',
    pathMatch: 'full',
    data: {
      title: 'Meteo Campoli - Monitoraggio Meteo',
    }
  },
  {
    path: 'dati-attuali',
    component: DatiAttualiComponent,
    data: {
      title: 'Meteo Campoli - Monitoraggio Meteo'

    }
  },
  {path: 'riepilogo', loadChildren: './riepilogo/riepilogo.module#RiepilogoModule'},
  {path: 'stazioni-meteo', loadChildren: './stazioni-meteo/stazioni-meteo.module#StazioniMeteoModule'},
  {path: 'satellite', loadChildren: './satellite/satellite.module#SatelliteModule'},
  {path: 'info', loadChildren: './info/info.module#InfoModule'},
  {path: 'webcam', loadChildren: './webcam/webcam.module#WebCamModule'},
  {path: 'previsioni', loadChildren: './previsioni/previsioni.module#PrevisioniModule'},
  {path: 'terremoti', loadChildren: './terremoti/terremoti.module#TerremotiModule'}
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
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
          return route;
        }
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        //Changing title
        this.titleService.setTitle(event['title']);
        //Changing meta with name="description"
        let tag = {name: 'description', content: event['metaDescription']};
        let attributeSelector: string = 'name="description"';
        this.metaService.removeTag(attributeSelector);
        this.metaService.addTag(tag, false);
      });
  }
}
