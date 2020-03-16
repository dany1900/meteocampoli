import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {NgModule} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule, Routes} from '@angular/router';


import {Meta, Title} from '@angular/platform-browser';
import {RiepilogoComponent} from "./riepilogo/riepilogo.component";
import {InfoComponent} from "./info/info.component";
import {SatTabComponent} from "./satellite/sat-tab.component";
import {PrevisioniComponent} from "./previsioni/previsioni.component";
import {TerremotiComponent} from "./terremoti/terremoti.component";
import {TerremotiItaliaComponent} from "./terremoti/terremoti-italia/terremoti-italia.component";
import {DatiAttualiComponent} from "./dati-attuali/dati-attuali.component";

import {TabStazioniComponent} from "./tab/tab-stazioni/tab-stazioni.component";
import {WebcamLazioComponent} from "./webcam/webcam-centro-italia/webcam-lazio/webcamLazio.component";
import {WebcamAbruzzoComponent} from "./webcam/webcam-centro-italia/webcam-abruzzo/webcam-abruzzo.component";
import {WebcamMoliseComponent} from "./webcam/webcam-centro-italia/webcam-molise/webcam-molise.component";
import {TabImmagginiWebcamComponent} from "./tab-immaggini-webcam/tab-immaggini-webcam.component";
import {WebcamUmbriaComponent} from "./webcam/webcam-centro-italia/webcam-umbria/webcam-umbria.component";
import {WebcamToscanaComponent} from "./webcam/webcam-centro-italia/webcam-toscana/webcam-toscana.component";
import {WebcamMarcheComponent} from "./webcam/webcam-centro-italia/webcam-marche/webcam-marche.component";

export const routes: Routes = [


  {
    path: '',
    redirectTo: 'datiAttuali',
    pathMatch: 'full',
    data: {
      title: 'Meteo Campoli - Monitoraggio Meteo'

    }

  },
  {
    path: 'datiAttuali',
    component: DatiAttualiComponent,
    data: {
      title: 'Meteo Campoli - Monitoraggio Meteo'

    }
  },
  {
    path: 'riepilogo',
    component: RiepilogoComponent,
    data: {
      title: 'Statistiche Meteo Campoli - Riepilogo Dati'

    }
  },
  {
    path: 'stazioni-meteo/generale',
    component: TabStazioniComponent,
    data: {
      title: 'Stazioni Meteo Limitrofe - Dati - Meteo Campoli'
    }
  },
  {
    path: 'stazioni-meteo/lazio',
    component: TabStazioniComponent,
    data: {
      title: 'Stazioni Meteo Lazio - Dati - Meteo Campoli'
    }
  },
  {
    path: 'stazioni-meteo/abruzzo',
    component: TabStazioniComponent,
    data: {
      title: 'Stazioni Meteo Abruzzo - Dati - Meteo Campoli'
    }
  },
  {
    path: 'stazioni-meteo/molise',
    component: TabStazioniComponent,
    data: {
      title: 'Stazioni Meteo Molise - Dati - Meteo Campoli'
    }
  },
  {
    path: 'stazioni-meteo/meteonetwork',
    component: TabStazioniComponent,
    data: {
      title: 'Stazioni Meteo Meteonetwork - Dati - Meteo Campoli'
    }
  },
  {
    path: 'stazioni-meteo/rete-meteo',
    component: TabStazioniComponent,
    data: {
      title: 'Stazioni Meteo Rete Meteo - Dati - Meteo Campoli',

    }
  },

  {
    path: 'previsioni',
    component: PrevisioniComponent,
    data: {
      title: 'Previsioni Meteo - Monitoraggio Indici Climatici - Meteo Campoli'
    }
  },
  {
    path: 'webcam/immagini',
    component: TabImmagginiWebcamComponent,
    data: {
      title: 'Immagini e WebCam - Meteo Campoli'
    }
  },

  {
    path: 'satellite/generale',
    component: SatTabComponent,
    data: {
      title: 'Satellite Metereologico - Radar Precipitazioni  - Meteo Campoli'
    },

  },
  {
    path: 'satellite/nord-italia',
    component: SatTabComponent,
    data: {
      title: 'Satellite Nord Italia - Radar Precipitazioni  - Meteo Campoli'
    }
  },
  {
    path: 'satellite/centro-italia',
    component: SatTabComponent,
    data: {
      title: 'Satellite Centro Italia - Radar Precipitazioni  - Meteo Campoli'
    }
  },
  {
    path: 'satellite/sud-italia',
    component: SatTabComponent,
    data: {
      title: 'Satellite Sud Italia - Radar Precipitazioni  - Meteo Campoli'
    }
  },
  {
    path: 'satellite/protezione-civile',
    component: SatTabComponent,
    data: {
      title: 'Satellite Protezione Civile - Radar Precipitazioni  - Meteo Campoli'
    }
  },
  {
    path: 'terremoti',
    component: TerremotiComponent,
    data: {
      title: 'Terremoti Elenco - Meteo Campoli'
    }
  },
  {
    path: 'terremoti/italia',
    component: TerremotiItaliaComponent,
    data: {
      title: 'Terremoti Elenco Italia - Meteo Campoli'
    }
  },
  {
    path: 'terremoti/mondo',
    component: TerremotiItaliaComponent,
    data: {
      title: 'Terremoti Elenco Mondo - Meteo Campoli'
    }
  },
  {
    path: 'info',
    component: InfoComponent,
    data: {
      title: 'Info e Curiosita - Qualita Aria - Orari Alba Tramonto'
    }
  },
  {
    path: 'webcam/montagna',
    component: TabImmagginiWebcamComponent,
    data: {
      title: 'WebCam Montagna Centro Italia - Meteo Campoli'
    }
  },
  {
    path: 'webcam/limitrofe',
    component: TabImmagginiWebcamComponent,
    data: {
      title: 'Webcam Valle di Comino - Frosinone - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/lazio',
    component: WebcamLazioComponent,
    data: {
      title: ' WebCam Lazio Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/abruzzo',
    component: WebcamAbruzzoComponent,
    data: {
      title: ' WebCam Abruzzo Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/molise',
    component: WebcamMoliseComponent,
    data: {
      title: 'WebCam Molise Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/umbria',
    component: WebcamUmbriaComponent,
    data: {
      title: 'WebCam Umbria Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/marche',
    component: WebcamMarcheComponent,
    data: {
      title: 'WebCam Marche Montagna - Meteo Campoli'
    }
  },
  {
    path: 'webcam/montagna/toscana',
    component: WebcamToscanaComponent,
    data: {
      title: 'WebCam Toscana Montagna - Meteo Campoli'
    }
  },
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
    //Boilerplate code to filter out only important router events and to pull out data object field from each route
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      //Data fields are merged so we can use them directly to take title and metaDescription for each route from them
      .mergeMap(route => route.data)
      //Real action starts there
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
