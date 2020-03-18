import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'satellite-protezione-civile',
  templateUrl: './satellite-protezione-civile.component.html',
  styleUrls: ['./satellite-protezione-civile.component.css']
})
export class SatelliteProtezioneCivileComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'title', content: 'Satellite Protezione Civile - Radar Precipitazioni  - Meteo Campoli'},
      {
        name: 'description',
        content: 'Satellite infrarossi, meteosat, fulminazioni e sinottica relativi al nord italia. Radar dettagliato delle precipitazioni in tempo reale. Focus sul nord italia.'
      },
      {
        name: 'keywords',
        content: 'satellite nord meteo campoli, radar nord meteo campoli, radar precipitazioni nord italia meteo campoli, radar fulmini nord italia, radar precipitazioni zoom nord italia, radar pioggia nord italia, satellite nord italia'
      },
      {property: 'og:locale', content: 'it_IT'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Satellite Nord Italia - Radar Precipitazioni  - Meteo Campoli'},
      {
        property: 'og:description',
        content: 'Satellite infrarossi, meteosat, fulminazioni e sinottica relativi al nord italia. Radar dettagliato delle precipitazioni in tempo reale. Focus sul nord italia.'
      },
      {property: 'og:url', content: 'www.meteocampoli.altervista.org/satellite/nord-italia'},
      {property: 'og:site_name', content: 'Satellite Nord Italia - Radar Precipitazioni  - Meteo Campoli'},
      {property: 'og:image', content: ''}
    ]);
  }

  ngOnInit() {
  }

}
