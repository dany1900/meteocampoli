import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'satellite-centro',
  templateUrl: './satellite-centro.component.html',
  styleUrls: ['./satellite-centro.component.css']
})
export class SatelliteCentroComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'title', content: 'Satellite Centro Italia - Radar Precipitazioni  - Meteo Campoli'},
      {
        name: 'description',
        content: 'Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale. Focus sul centro italia. '
      },
      {
        name: 'keywords',
        content: 'Satellite centro meteo campoli, radar centro meteo campoli, radar precipitazioni centro italia meteo campoli, radar fulmini centro italia, radar precipitazioni zoom centro italia, radar pioggia centro italia, satellite centro italia'
      },
      {property: 'og:locale', content: 'it_IT'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Satellite Centro Italia - Radar Precipitazioni  - Meteo Campoli'},
      {
        property: 'og:description',
        content: 'Satelliti infrarossi, meteosat, fulminazioni e sinottica. Radar dettagliato delle precipitazioni in tempo reale. Focus sul centro italia.'
      },
      {property: 'og:url', content: 'www.meteocampoli.altervista.org/satellite/centro-italia'},
      {property: 'og:site_name', content: 'Satellite Centro Italia - Radar Precipitazioni  - Meteo Campoli'},
      {property: 'og:image', content: ''}
    ]);
  }

  ngOnInit() {
  }

}
