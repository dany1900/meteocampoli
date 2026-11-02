
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, forkJoin, of, timer } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { SEOService } from '../../service/seoservice.service';
import { Router } from '@angular/router';
import { UtiliyService } from '../../service/utiliy.service';

interface AirQualityCurrent {
  time?: string;
  european_aqi?: number | null;
  pm2_5?: number | null;
  pm10?: number | null;
  grass_pollen?: number | null;
  ragweed_pollen?: number | null;
  mugwort_pollen?: number | null;
  olive_pollen?: number | null;
  birch_pollen?: number | null;
  alder_pollen?: number | null;
}

interface AirQualityResponse {
  current?: AirQualityCurrent;
  error?: boolean;
  reason?: string;
}

interface LocalitaAria {
  nome: string;
  lat: number;
  lon: number;
  principale?: boolean;
  aqi: number | null;
  pm25: number | null;
  pm10: number | null;
  aggiornamento: string;
  errore: boolean;
}

interface Polline {
  nome: string;
  valore: number | null;
  stato: string;
  percentuale: number;
  colore: string;
}

@Component({
  selector: 'app-qualita-aria',
  templateUrl: './qualita-aria.component.html',
  styleUrls: ['./qualita-aria.component.css']
})
export class QualitaAriaComponent implements OnInit, OnDestroy {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  imageLoader = true;
  caricamento = false;
  erroreGenerale = '';
  ultimoAggiornamento = '';

  private readonly apiUrl =
    'https://air-quality-api.open-meteo.com/v1/air-quality';

  private readonly destroy$ = new Subject<void>();

  private readonly intervalloAggiornamento = 15 * 60 * 1000;

  readonly urlBollettini =
    'https://www.regione.lazio.it/protezione-civile/centro-funzionale-regionale/bollettini-criticita-idrogeologica-idraulica';

  readonly urlAllertamenti =
    'https://www.regione.lazio.it/protezione-civile/centro-funzionale-regionale/bollettini-allertamenti';

  readonly urlOpenMeteo =
    'https://open-meteo.com/en/docs/air-quality-api';

  localita: LocalitaAria[] = [
    {
      nome: 'Campoli Appennino',
      lat: 41.735,
      lon: 13.684,
      principale: true,
      aqi: null,
      pm25: null,
      pm10: null,
      aggiornamento: '',
      errore: false
    },
    {
      nome: 'Sora',
      lat: 41.7177,
      lon: 13.6141,
      aqi: null,
      pm25: null,
      pm10: null,
      aggiornamento: '',
      errore: false
    },
    {
      nome: 'Isola del Liri',
      lat: 41.6778,
      lon: 13.5786,
      aqi: null,
      pm25: null,
      pm10: null,
      aggiornamento: '',
      errore: false
    },
    {
      nome: 'Frosinone',
      lat: 41.6396,
      lon: 13.3509,
      aqi: null,
      pm25: null,
      pm10: null,
      aggiornamento: '',
      errore: false
    },
    {
      nome: 'Fiuggi',
      lat: 41.798,
      lon: 13.223,
      aqi: null,
      pm25: null,
      pm10: null,
      aggiornamento: '',
      errore: false
    },
    {
      nome: 'Cassino',
      lat: 41.4919,
      lon: 13.8303,
      aqi: null,
      pm25: null,
      pm10: null,
      aggiornamento: '',
      errore: false
    }
  ];

  pollini: Polline[] = [
    {
      nome: 'Graminacee (Poaceae)',
      valore: null,
      stato: 'Non disponibile',
      percentuale: 0,
      colore: '#8d99ae'
    },
    {
      nome: 'Ambrosia e Composite',
      valore: null,
      stato: 'Non disponibile',
      percentuale: 0,
      colore: '#8d99ae'
    },
    {
      nome: 'Olivo (Oleaceae)',
      valore: null,
      stato: 'Non disponibile',
      percentuale: 0,
      colore: '#8d99ae'
    },
    {
      nome: 'Betulla e Ontano',
      valore: null,
      stato: 'Non disponibile',
      percentuale: 0,
      colore: '#8d99ae'
    }
  ];

  constructor(
    private seo: SEOService,
    protected router: Router,
    public utilityService: UtiliyService,
    private http: HttpClient
  ) {
    this.title =
      'Qualità Aria Campoli Appennino - AQI, PM2.5, PM10 e Pollini';

    this.description =
      'Qualità dell’aria a Campoli Appennino, Sora, Isola del Liri, ' +
      'Frosinone, Fiuggi e Cassino. Indice AQI, PM2.5, PM10, ' +
      'pollini e collegamenti alle allerte della Regione Lazio.';

    this.keywords =
      'qualità aria Campoli Appennino, AQI Sora, ' +
      'PM2.5 Frosinone, PM10, pollini Lazio, ' +
      'allerta meteo Bacino del Liri';

    this.ogUrl =
      'https://meteocampoli.altervista.org/qualita-aria';

    this.ogImage = '';

    this.seo.updateMetaInfo(
      this.title,
      this.description,
      this.keywords,
      this.ogUrl,
      this.ogImage
    );

    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();

    // Prima lettura immediata e aggiornamento ogni 15 minuti.
    timer(0, this.intervalloAggiornamento)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.caricaDati());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  caricaDati(): void {
    if (this.caricamento) {
      return;
    }

    this.caricamento = true;
    this.erroreGenerale = '';

    const richieste = this.localita.map(localita => {
      const principale = !!localita.principale;

      const campi = [
        'european_aqi',
        'pm2_5',
        'pm10'
      ];

      if (principale) {
        campi.push(
          'grass_pollen',
          'ragweed_pollen',
          'mugwort_pollen',
          'olive_pollen',
          'birch_pollen',
          'alder_pollen'
        );
      }

      const params = new HttpParams()
        .set('latitude', localita.lat.toString())
        .set('longitude', localita.lon.toString())
        .set('current', campi.join(','))
        .set('timezone', 'Europe/Rome');

      return this.http.get<AirQualityResponse>(
        this.apiUrl,
        { params }
      ).pipe(
        catchError(error => {
          console.warn(
            'Errore qualità aria ' + localita.nome,
            error
          );
          return of(null);
        })
      );
    });

    forkJoin(richieste)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: risposte => {
          let riuscite = 0;

          risposte.forEach((risposta, indice) => {
            const localita = this.localita[indice];

            if (
              !risposta ||
              risposta.error ||
              !risposta.current
            ) {
              localita.errore = true;
              localita.aqi = null;
              localita.pm25 = null;
              localita.pm10 = null;
              localita.aggiornamento = '';

              if (localita.principale) {
                this.azzeraPollini();
              }
              return;
            }

            riuscite++;

            const dati = risposta.current;

            localita.errore = false;
            localita.aqi = this.numero(dati.european_aqi);
            localita.pm25 = this.numero(dati.pm2_5);
            localita.pm10 = this.numero(dati.pm10);
            localita.aggiornamento = dati.time || '';

            if (localita.principale) {
              this.aggiornaPollini(dati);
            }
          });

          this.imageLoader = false;
          this.caricamento = false;

          if (riuscite > 0) {
            this.ultimoAggiornamento =
              this.formattaData(new Date());
          } else {
            this.erroreGenerale =
              'Impossibile recuperare i dati da Open-Meteo.';
          }
        },

        error: error => {
          console.error('Errore aggiornamento aria:', error);

          this.caricamento = false;
          this.imageLoader = false;
          this.erroreGenerale =
            'Si è verificato un errore durante il caricamento.';
        }
      });
  }

  private numero(
    valore: number | null | undefined
  ): number | null {
    return typeof valore === 'number' &&
    isFinite(valore)
      ? valore
      : null;
  }

  private aggiornaPollini(dati: AirQualityCurrent): void {
    this.impostaPolline(
      0,
      this.numero(dati.grass_pollen),
      50
    );

    // Combina i due tipi evitando di trasformare
    // dati assenti in concentrazione zero.
    this.impostaPolline(
      1,
      this.sommaDisponibili(
        dati.ragweed_pollen,
        dati.mugwort_pollen
      ),
      50
    );

    this.impostaPolline(
      2,
      this.numero(dati.olive_pollen),
      50
    );

    this.impostaPolline(
      3,
      this.sommaDisponibili(
        dati.birch_pollen,
        dati.alder_pollen
      ),
      50
    );
  }

  private sommaDisponibili(
    primo: number | null | undefined,
    secondo: number | null | undefined
  ): number | null {
    const a = this.numero(primo);
    const b = this.numero(secondo);

    if (a === null && b === null) {
      return null;
    }

    // Per le coppie di specie, se manca un dato
    // non mostriamo una somma incompleta.
    if (a === null || b === null) {
      return null;
    }

    return a + b;
  }

  private impostaPolline(
    indice: number,
    valore: number | null,
    scalaGrafica: number
  ): void {
    const polline = this.pollini[indice];
    polline.valore = valore;

    if (valore === null) {
      polline.stato = 'Non disponibile';
      polline.percentuale = 0;
      polline.colore = '#8d99ae';
      return;
    }

    if (valore === 0) {
      polline.stato = 'Nullo';
      polline.colore = '#00c9a7';
    } else if (valore < 10) {
      polline.stato = 'Presente';
      polline.colore = '#51b86a';
    } else if (valore < 30) {
      polline.stato = 'Concentrazione crescente';
      polline.colore = '#e0a800';
    } else {
      polline.stato = 'Concentrazione elevata';
      polline.colore = '#df5c52';
    }

    // Scala soltanto visiva: non rappresenta
    // soglie cliniche o allergologiche ufficiali.
    polline.percentuale = Math.min(
      100,
      Math.max(2, valore / scalaGrafica * 100)
    );
  }

  private azzeraPollini(): void {
    this.pollini.forEach(polline => {
      polline.valore = null;
      polline.stato = 'Non disponibile';
      polline.percentuale = 0;
      polline.colore = '#8d99ae';
    });
  }

  get principale(): LocalitaAria {
    return this.localita[0];
  }

  get altreLocalita(): LocalitaAria[] {
    return this.localita.slice(1);
  }

  get polliniDisponibili(): boolean {
    return this.pollini.some(p => p.valore !== null);
  }

  formattaNumero(
    valore: number | null,
    decimali = 1
  ): string {
    if (valore === null) {
      return 'N/D';
    }

    return valore.toLocaleString('it-IT', {
      minimumFractionDigits: decimali,
      maximumFractionDigits: decimali
    });
  }

  private formattaData(data: Date): string {
    return data.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  statoAqi(aqi: number | null): string {
    if (aqi === null) return 'Dato non disponibile';
    if (aqi <= 20) return 'Buona';
    if (aqi <= 40) return 'Discreta';
    if (aqi <= 60) return 'Moderata';
    if (aqi <= 80) return 'Scarsa';
    if (aqi <= 100) return 'Molto scarsa';
    return 'Estremamente scarsa';
  }

  coloreAqi(aqi: number | null): string {
    if (aqi === null) return '#8d99ae';
    if (aqi <= 20) return '#00b89c';
    if (aqi <= 40) return '#3498db';
    if (aqi <= 60) return '#d89914';
    if (aqi <= 80) return '#ee793e';
    if (aqi <= 100) return '#d9534f';
    return '#963ca9';
  }

  testoQualitaPollini(): string {
    if (!this.polliniDisponibili) {
      return 'Dati pollinici non disponibili';
    }

    const massimo = Math.max(
      ...this.pollini
        .filter(p => p.valore !== null)
        .map(p => p.valore as number)
    );

    if (massimo === 0) {
      return 'Nessun polline rilevato dal modello';
    }

    return 'Pollini presenti nel modello previsionale';
  }

  apriFonte(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
