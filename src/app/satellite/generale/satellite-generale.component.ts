import {Component, OnInit} from '@angular/core';
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'satellite-generale',
  templateUrl: './satellite-generale.component.html',
  styleUrls: ['../sat-tab.component.css']
})

export class SatelliteGeneraleComponent implements OnInit {
  //newcomponent = "Entered in new component created";

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'title', content: 'Satellite Metereologico - Radar Precipitazioni  - Meteo Campoli'},
      {
        name: 'description',
        content: 'Monitoraggio completo del meteo. Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale.'
      },
      {
        name: 'keywords',
        content: 'satellite meteo campoli, radar meteo campoli, radar precipitazioni meteo campoli, radar fulmini meteo campoli, radar precipitazioni zoom, radar pioggia meteo campoli'
      },
      {property: 'og:locale', content: 'it_IT'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Satellite Metereologico - Radar Precipitazioni  - Meteo Campoli'},
      {
        property: 'og:description',
        content: 'Monitoraggio completo del meteo. Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale.'
      },
      {property: 'og:url', content: 'www.meteocampoli.altervista.org/satellite/generale'},
      {property: 'og:site_name', content: 'Satellite Metereologico - Radar Precipitazioni  - Meteo Campoli'},
      {property: 'og:image', content: ''}
    ]);


  }

  ngOnInit() {
  }

  public show1: boolean = false;
  public show2: boolean = false;

  public buttonName: any = 'Mostra';

  toggle() {
    this.show1 = !this.show1;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show1)
      this.buttonName = "Nascondi";
    else
      this.buttonName = "Mostra";
  }

  test2() {
    this.show2 = !this.show2;


    if (this.show2)
      this.buttonName = "Nascondi";
    else
      this.buttonName = "Mostra";

  }
}
