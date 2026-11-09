import { Component, OnInit, Renderer2 } from '@angular/core';
import { SEOService } from '../../service/seoservice.service';
import { Router } from '@angular/router';
import { UtiliyService } from '../../service/utiliy.service';

interface MappaAnomalie {
  id: string;
  titolo: string;
  descrizione: string;
  fonte: string;
  periodo: string;
  immagine: string;
  paginaFonte: string;
}
interface GruppoAnomalie {
  id: string;
  titolo: string;
  sottotitolo: string;
  mappe: MappaAnomalie[];
}

@Component({
  selector: 'app-anomalie',
  templateUrl: './anomalie.component.html',
  styleUrls: ['./anomalie.component.css']
})
export class AnomalieComponent implements OnInit {
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  immaginiCaricate: Record<string, boolean> = {};
  immaginiErrore: Record<string, boolean> = {};
  immagineIngrandita: MappaAnomalie | null = null;

  // Le immagini Copernicus sono relative a ottobre 2026: aggiornare URL e periodo
  // al nuovo bollettino mensile. Non presentarle come immagini 'latest'.
  readonly gruppi: GruppoAnomalie[] = [
    {
      id: 'europa',
      titolo: 'Anomalie in Europa',
      sottotitolo: 'Temperatura e condizioni idrologiche: mappe Copernicus ERA5.',
      mappe: [
        {
          id: 'eu-temperatura',
          titolo: 'Anomalie della temperatura in Europa',
          descrizione: 'Scostamento della temperatura dell’aria dalla media 1991–2020.',
          fonte: 'Copernicus C3S / ECMWF', periodo: 'Ottobre 2026',
          immagine: 'https://climate.copernicus.eu/sites/default/files/2026-11/C3S_Bulletin_temp_202610_Fig5_map_temperature_anomalies_europe_1.png',
          paginaFonte: 'https://climate.copernicus.eu/surface-air-temperature-october-2026'
        },
        {
          id: 'eu-precipitazioni',
          titolo: 'Anomalie delle precipitazioni e dell’umidità in Europa',
          descrizione: 'Quattro mappe: precipitazioni, umidità relativa, umidità del suolo e temperatura.',
          fonte: 'Copernicus C3S / ECMWF', periodo: 'Ottobre 2026',
          immagine: 'https://climate.copernicus.eu/sites/default/files/2026-11/C3S_Bulletin_hydro_202610_Fig1_map_anomalies_October_europe.png',
          paginaFonte: 'https://climate.copernicus.eu/precipitation-relative-humidity-soil-moisture-and-river-flow-october-2026'
        }
      ]
    },
    {
      id: 'mondo', titolo: 'Anomalie nel mondo',
      sottotitolo: 'Distribuzione globale delle anomalie termiche e delle temperature marine.',
      mappe: [
        {
          id: 'world-temperatura', titolo: 'Anomalie della temperatura globale',
          descrizione: 'Anomalie della temperatura dell’aria a livello mondiale rispetto al 1991–2020.',
          fonte: 'Copernicus C3S / ECMWF', periodo: 'Ottobre 2026',
          immagine: 'https://climate.copernicus.eu/sites/default/files/2026-11/C3S_Bulletin_temp_202610_Fig3a_map_temperature_anomalies_global.png',
          paginaFonte: 'https://climate.copernicus.eu/surface-air-temperature-october-2026'
        },
        {
          id: 'world-sst', titolo: 'Anomalie della temperatura superficiale del mare',
          descrizione: 'Anomalie termiche oceaniche, con evidenza dell’area Niño 3.4.',
          fonte: 'Copernicus C3S / ECMWF', periodo: 'Ottobre 2026',
          immagine: 'https://climate.copernicus.eu/sites/default/files/2026-11/C3S_Bulletin_temp_202610_Fig7a_map_sst_anomalies_global.png',
          paginaFonte: 'https://climate.copernicus.eu/surface-air-temperature-october-2026'
        },
        {
          id: 'world-sst-estremi', titolo: 'Temperature marine: anomalie ed estremi',
          descrizione: 'Le aree marine relativamente più calde e più fredde nella distribuzione storica.',
          fonte: 'Copernicus C3S / ECMWF', periodo: 'Ottobre 2026',
          immagine: 'https://climate.copernicus.eu/sites/default/files/2026-11/C3S_Bulletin_temp_202610_Fig7b_map_sst_anomalies_and_extremes_global.png',
          paginaFonte: 'https://climate.copernicus.eu/surface-air-temperature-october-2026'
        },
        {
          id: 'world-sst-settimana', titolo: 'Anomalie superficiali marine – ultima settimana',
          descrizione: 'Mappa NOAA delle anomalie SST della settimana più recente pubblicata nella directory.',
          fonte: 'NOAA / CPC', periodo: 'Immagine aggiornata dalla fonte',
          immagine: 'https://ftp.cpc.ncep.noaa.gov/CPC/li.xu/enso/ssta-last-week.png',
          paginaFonte: 'https://ftp.cpc.ncep.noaa.gov/CPC/li.xu/enso/'
        }
      ]
    },
    {
      id: 'storico', titolo: 'Evoluzione climatica e serie storiche',
      sottotitolo: 'Grafici delle anomalie globali lungo diversi decenni.',
      mappe: [
        {
          id: 'nasa', titolo: 'Temperature globali dal 1880 – NASA',
          descrizione: 'Serie storica delle anomalie della temperatura media globale di superficie.',
          fonte: 'NASA GISS / GISTEMP', periodo: 'Aggiornamento periodico NASA',
          immagine: 'https://data.giss.nasa.gov/gistemp/graphs/graph_data/Global_Mean_Estimates_based_on_Land_and_Ocean_Data/graph.png',
          paginaFonte: 'https://data.giss.nasa.gov/gistemp/'
        },
        {
          id: 'cop-annuale', titolo: 'Andamento globale e stima per il 2026',
          descrizione: 'Evoluzione delle anomalie annuali rispetto al periodo preindustriale e intervallo di stima 2026.',
          fonte: 'Copernicus C3S / ECMWF', periodo: 'Analisi ottobre 2026',
          immagine: 'https://climate.copernicus.eu/sites/default/files/2026-11/C3S_Bulletin_temp_202610_FigH1_timeseries_annual_global_surface_temperature_anomalies_ref1850-1900_prediction.png',
          paginaFonte: 'https://climate.copernicus.eu/surface-air-temperature-october-2026'
        }
      ]
    }
  ];

  constructor(private seo: SEOService, protected router: Router,
              public renderer: Renderer2, public utilityService: UtiliyService) {
    this.title = 'Anomalie Meteo e Clima - Meteo Campoli';
    this.description = 'Mappe dirette delle anomalie di temperatura e precipitazioni in Europa e nel mondo, con serie storiche Copernicus, NOAA e NASA.';
    this.keywords = 'anomalie termiche, anomalie precipitazioni, Europa, ERA5, Copernicus, NOAA, NASA, temperatura mare';
    this.ogUrl = 'https://meteocampoli.altervista.org/riepilogo/anomalie';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit(): void { this.utilityService.scrollToSpecifyPosition(); }
  immagineCaricata(id: string): void { this.immaginiCaricate[id] = true; }
  immagineFallita(id: string): void { this.immaginiErrore[id] = true; }
  apriImmagine(mappa: MappaAnomalie): void { this.immagineIngrandita = mappa; }
  chiudiImmagine(): void { this.immagineIngrandita = null; }
  toggleClass(event: any, classe: string): void {
    const hasClass = event.target.classList.contains(classe);
    if (hasClass) { this.renderer.removeClass(event.target, classe); }
    else { this.renderer.addClass(event.target, classe); }
  }
}
