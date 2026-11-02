
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
  nitrogen_dioxide?: number | null;
  ozone?: number | null;
  sulphur_dioxide?: number | null;
  carbon_monoxide?: number | null;
  dust?: number | null;
  uv_index?: number | null;
  european_aqi_pm2_5?: number | null;
  european_aqi_pm10?: number | null;
  european_aqi_nitrogen_dioxide?: number | null;
  european_aqi_ozone?: number | null;
  european_aqi_sulphur_dioxide?: number | null;
  grass_pollen?: number | null;
  ragweed_pollen?: number | null;
  mugwort_pollen?: number | null;
  olive_pollen?: number | null;
  birch_pollen?: number | null;
  alder_pollen?: number | null;
}

interface AirQualityHourly {
  time?: string[];
  european_aqi?: Array<number | null>;
  pm2_5?: Array<number | null>;
  pm10?: Array<number | null>;
}

interface Inquinante {
  nome: string;
  formula: string;
  valore: number | null;
  unita: string;
  indice: number | null;
  note: string;
}

interface PuntoPrevisione {
  ora: string;
  aqi: number | null;
  pm25: number | null;
  pm10: number | null;
}

interface AirQualityResponse {
  current?: AirQualityCurrent;
  hourly?: AirQualityHourly;
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

  readonly previsioniOpzioni = [
    { codice: 'aqi', nome: 'AQI' },
    { codice: 'pm25', nome: 'PM2.5' },
    { codice: 'pm10', nome: 'PM10' }
  ];
  previsioneScelta: 'aqi' | 'pm25' | 'pm10' = 'aqi';
  previsione: PuntoPrevisione[] = [];
  storico: PuntoPrevisione[] = [];
  readonly numeroOrePrevisione = 48;
  inquinanti: Inquinante[] = [
    { nome: 'Biossido di azoto', formula: 'NO₂', valore: null, unita: 'µg/m³', indice: null, note: 'Traffico e combustioni' },
    { nome: 'Ozono troposferico', formula: 'O₃', valore: null, unita: 'µg/m³', indice: null, note: 'Rilevante soprattutto d’estate' },
    { nome: 'Anidride solforosa', formula: 'SO₂', valore: null, unita: 'µg/m³', indice: null, note: 'Combustioni e fonti industriali' },
    { nome: 'Monossido di carbonio', formula: 'CO', valore: null, unita: 'µg/m³', indice: null, note: 'Combustioni incomplete' },
    { nome: 'Polveri sahariane', formula: 'Dust', valore: null, unita: 'µg/m³', indice: null, note: 'Stima modellistica delle polveri desertiche' },
    { nome: 'Indice UV', formula: 'UV', valore: null, unita: '', indice: null, note: 'Radiazione ultravioletta, non un inquinante' }
  ];
  sottoindici: Array<{ nome: string; valore: number | null }> = [
    { nome: 'PM2.5', valore: null },
    { nome: 'PM10', valore: null },
    { nome: 'NO₂', valore: null },
    { nome: 'O₃', valore: null },
    { nome: 'SO₂', valore: null }
  ];


  private readonly apiUrl =
    'https://air-quality-api.open-meteo.com/v1/air-quality';

  private readonly destroy$ = new Subject<void>();

  private readonly intervalloAggiornamento = 15 * 60 * 1000;

  readonly urlBollettini =
    'https://www.regione.lazio.it/protezione-civile/centro-funzionale-regionale/bollettini-criticita-idrogeologica-idraulica';

  readonly urlAllertamenti =
    'https://www.regione.lazio.it/protezione-civile/centro-funzionale-regionale/bollettini-allertamenti';

  readonly urlArpaLazio =
    'https://www.arpalazio.it/stato-della-qualit%C3%A0-dell-aria';

  readonly urlArpaArchivio =
    'https://www.arpalazio.it/anno-in-corso';

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
      'Monitoraggio Qualità Aria - Meteo Campoli';

    this.description =
      'Monitoraggio e previsioni sulla qualità dell’aria. ' +
      'Indice AQI, PM2.5, PM10, pollini, ozono';

    this.keywords =
      'qualità aria Campoli Appennino, qualità aria Sora, ' +
      'qualità aria Frosinone, indice AQI, AQI Lazio, ' +
      'PM2.5 Sora, PM10 Frosinone, inquinamento atmosferico, ' +
      'pollini Lazio, allergie pollini, ozono O3, NO2, SO2, ' +
      'polveri sahariane, previsioni qualità aria, ' +
      'Isola del Liri, Fiuggi, Cassino';


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
          'nitrogen_dioxide',
          'ozone',
          'sulphur_dioxide',
          'carbon_monoxide',
          'dust',
          'uv_index',
          'european_aqi_pm2_5',
          'european_aqi_pm10',
          'european_aqi_nitrogen_dioxide',
          'european_aqi_ozone',
          'european_aqi_sulphur_dioxide',
          'grass_pollen',
          'ragweed_pollen',
          'mugwort_pollen',
          'olive_pollen',
          'birch_pollen',
          'alder_pollen'
        );
      }

      let params = new HttpParams()
        .set('latitude', localita.lat.toString())
        .set('longitude', localita.lon.toString())
        .set('current', campi.join(','))
        .set('timezone', 'Europe/Rome');

      if (principale) {
        params = params
          .set('hourly', 'european_aqi,pm2_5,pm10')
          .set('forecast_hours', this.numeroOrePrevisione.toString())
          .set('past_hours', '24');
      }

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
                this.azzeraInquinanti();
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
              this.aggiornaInquinanti(dati);
              this.aggiornaPrevisioni(risposta.hourly);
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

  private aggiornaInquinanti(d: AirQualityCurrent): void {
    const valori = [d.nitrogen_dioxide, d.ozone, d.sulphur_dioxide,
      d.carbon_monoxide, d.dust, d.uv_index];
    const indici = [d.european_aqi_nitrogen_dioxide, d.european_aqi_ozone,
      d.european_aqi_sulphur_dioxide, null, null, null];
    this.inquinanti.forEach((item, i) => {
      item.valore = this.numero(valori[i]);
      item.indice = this.numero(indici[i]);
    });
    const aqi = [d.european_aqi_pm2_5, d.european_aqi_pm10,
      d.european_aqi_nitrogen_dioxide, d.european_aqi_ozone,
      d.european_aqi_sulphur_dioxide];
    this.sottoindici.forEach((item, i) => item.valore = this.numero(aqi[i]));
  }

  private azzeraInquinanti(): void {
    this.inquinanti.forEach(item => { item.valore = null; item.indice = null; });
    this.sottoindici.forEach(item => item.valore = null);
    this.previsione = [];
    this.storico = [];
  }

  private aggiornaPrevisioni(dati?: AirQualityHourly): void {
    if (!dati || !Array.isArray(dati.time)) {
      this.storico = [];
      this.previsione = [];
      return;
    }

    // past_hours=24 e forecast_hours=48 restituiscono due periodi
    // consecutivi; evitiamo di mescolare osservazioni modellistiche
    // passate con gli orari futuri.
    const punti = dati.time.map((ora, indice) => ({
      ora,
      aqi: this.numero(dati.european_aqi?.[indice]),
      pm25: this.numero(dati.pm2_5?.[indice]),
      pm10: this.numero(dati.pm10?.[indice])
    }));
    this.storico = punti.slice(0, 24);
    this.previsione = punti.slice(24, 24 + this.numeroOrePrevisione);
  }

  get storicoDisponibile(): boolean {
    return this.storico.some(p => p.aqi !== null);
  }

  get graficoDisponibile(): boolean {
    return this.storicoDisponibile ||
      this.previsione.some(p => p.aqi !== null);
  }

  get massimoGrafico(): number {
    const numeri = [...this.storico, ...this.previsione]
      .map(p => p.aqi)
      .filter((n): n is number => n !== null);
    return Math.max(20, ...numeri);
  }

  // SVG indipendente da librerie di grafici.
  // 24 ore passate + 48 future: asse orizzontale 0...720.
  private coordGrafico(punti: PuntoPrevisione[], offset: number): string {
    const totale = this.storico.length + this.previsione.length;
    if (totale < 2) return '';
    return punti.map((p, indice) => {
      if (p.aqi === null) return '';
      const x = ((offset + indice) / (totale - 1)) * 720;
      const y = 190 - ((p.aqi as number) / this.massimoGrafico) * 165;
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).filter(Boolean).join(' ');
  }

  get storicoSvg(): string {
    return this.coordGrafico(this.storico, 0);
  }

  get futuroSvg(): string {
    // Inizia dall'ultimo punto passato per avere continuità visiva.
    const precedente = this.storico.length ?
      [this.storico[this.storico.length - 1]] : [];
    return this.coordGrafico(precedente.concat(this.previsione),
      Math.max(0, this.storico.length - 1));
  }

  get separatoreSvg(): number {
    const totale = this.storico.length + this.previsione.length;
    return totale > 1 ?
      ((this.storico.length - 0.5) / (totale - 1)) * 720 : 0;
  }

  get miglioreOra(): PuntoPrevisione | null {
    const validi = this.previsione.filter(p => p.aqi !== null);
    if (!validi.length) return null;
    return validi.reduce((best, p) =>
      (p.aqi as number) < (best.aqi as number) ? p : best);
  }

  get peggioreOra(): PuntoPrevisione | null {
    const validi = this.previsione.filter(p => p.aqi !== null);
    if (!validi.length) return null;
    return validi.reduce((worst, p) =>
      (p.aqi as number) > (worst.aqi as number) ? p : worst);
  }

  get inquinantePrevalente(): string {
    const disponibili = this.sottoindici.filter(v => v.valore !== null);
    if (!disponibili.length) return 'Non disponibile';
    const max = Math.max(...disponibili.map(v => v.valore as number));
    return disponibili.filter(v => v.valore === max).map(v => v.nome).join(', ');
  }

  get previsioneDisponibile(): boolean {
    return this.previsione.some(p => p[this.previsioneScelta] !== null);
  }

  get previsioneMassimo(): number {
    const valori = this.previsione
      .map(p => p[this.previsioneScelta])
      .filter((v): v is number => v !== null);
    return Math.max(1, ...valori);
  }

  larghezzaPrevisione(p: PuntoPrevisione): number {
    const v = p[this.previsioneScelta];
    return v === null ? 0 : Math.max(1, 100 * v / this.previsioneMassimo);
  }

  etichettaPrevisione(ora: string): string {
    // Stringa ISO locale di Open-Meteo (Europe/Rome).
    const parti = ora.split('T');
    if (parti.length !== 2) return ora;
    const giorno = parti[0].slice(8, 10);
    return giorno + '/ ' + parti[1].slice(0, 5);
  }

  mostraOrePrevisione(): PuntoPrevisione[] {
    // Un campione ogni 3 ore per non creare 48 righe.
    return this.previsione.filter((_, i) => i % 3 === 0);
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
