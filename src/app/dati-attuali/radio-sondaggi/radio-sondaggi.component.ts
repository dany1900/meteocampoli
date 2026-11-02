import { Component, OnInit, OnDestroy } from '@angular/core';
import * as JSZip from 'jszip';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SEOService } from '../../service/seoservice.service';
import { UtiliyService } from '../../service/utiliy.service';

interface LocalitaQuota {
  nome: string;
  latitudine: number;
  longitudine: number;
}

interface DatiOrariQuota {
  time: string[];
  [campo: string]: any;
}

interface RispostaOpenMeteo {
  latitude?: number;
  longitude?: number;
  elevation?: number;
  hourly?: DatiOrariQuota;
  error?: boolean;
  reason?: string;
}

interface LivelloQuota {
  pressione: number;
  quota: number | null;
  temperatura: number | null;
  rugiada: number | null;
  umidita: number | null;
  vento: number | null;
  direzione: number | null;
}

interface OraDisponibile {
  indice: number;
  data: string;
  etichetta: string;
}

interface PuntoGrafico {
  x: number;
  y: number;
}


interface LivelloOsservato {
  pressione: number;
  quota: number | null;
  temperatura: number | null;
  rugiada: number | null;
  umidita: number | null;
  vento: number | null;
  direzione: number | null;
}

interface LancioOsservato {
  id: string;
  dataUtc: string;
  livelli: LivelloOsservato[];
}

@Component({
  selector: 'radio-sondaggi',
  templateUrl: './radio-sondaggi.component.html',
  styleUrls: ['./radio-sondaggi.component.css']
})
export class RadioSondaggiComponent implements OnInit, OnDestroy {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage = '';

  readonly apiUrl =
    'https://api.open-meteo.com/v1/forecast';

  readonly urlDocumentazione =
    'https://open-meteo.com/en/docs';

  readonly localita: LocalitaQuota[] = [
    { nome: 'Campoli Appennino', latitudine: 41.735, longitudine: 13.684 },
    { nome: 'Sora', latitudine: 41.7177, longitudine: 13.6141 },
    { nome: 'Pratica di Mare', latitudine: 41.65, longitudine: 12.45 },
    { nome: "L'Aquila (Abruzzo)", latitudine: 42.3498, longitudine: 13.3995 },
    { nome: 'Potenza (Basilicata)', latitudine: 40.6395, longitudine: 15.8050 },
    { nome: 'Catanzaro (Calabria)', latitudine: 38.9098, longitudine: 16.5877 },
    { nome: 'Napoli (Campania)', latitudine: 40.8518, longitudine: 14.2681 },
    { nome: 'Bologna (Emilia-Romagna)', latitudine: 44.4949, longitudine: 11.3426 },
    { nome: 'Trieste (Friuli-Venezia Giulia)', latitudine: 45.6495, longitudine: 13.7768 },
    { nome: 'Roma (Lazio)', latitudine: 41.9028, longitudine: 12.4964 },
    { nome: 'Genova (Liguria)', latitudine: 44.4056, longitudine: 8.9463 },
    { nome: 'Milano (Lombardia)', latitudine: 45.4642, longitudine: 9.1900 },
    { nome: 'Ancona (Marche)', latitudine: 43.6158, longitudine: 13.5189 },
    { nome: 'Campobasso (Molise)', latitudine: 41.5603, longitudine: 14.6627 },
    { nome: 'Torino (Piemonte)', latitudine: 45.0703, longitudine: 7.6869 },
    { nome: 'Bari (Puglia)', latitudine: 41.1171, longitudine: 16.8719 },
    { nome: 'Cagliari (Sardegna)', latitudine: 39.2238, longitudine: 9.1217 },
    { nome: 'Palermo (Sicilia)', latitudine: 38.1157, longitudine: 13.3615 },
    { nome: 'Firenze (Toscana)', latitudine: 43.7696, longitudine: 11.2558 },
    { nome: 'Trento (Trentino-Alto Adige)', latitudine: 46.0664, longitudine: 11.1258 },
    { nome: 'Perugia (Umbria)', latitudine: 43.1107, longitudine: 12.3908 },
    { nome: "Aosta (Valle d'Aosta)", latitudine: 45.7370, longitudine: 7.3201 },
    { nome: 'Venezia (Veneto)', latitudine: 45.4408, longitudine: 12.3155 }
  ];

  readonly pressioni = [
    1000, 975, 950, 925, 900, 850,
    800, 700, 600, 500, 400, 300,
    250, 200, 150, 100
  ];

  localitaSelezionata = 0;

  caricamento = false;
  errore = '';
  ultimoAggiornamento = '';
  urlRichiesta = '';

  risposta: RispostaOpenMeteo | null = null;

  oreDisponibili: OraDisponibile[] = [];
  indiceOraSelezionata = -1;
  indiceOraCorrente = -1;

  livelli: LivelloQuota[] = [];

  zeroTermico: number | null = null;
  temperaturaMinima: number | null = null;
  temperaturaMassima: number | null = null;

  puntiTemperatura = '';
  puntiRugiada = '';

  readonly quotaMassimaGrafico = 16000;
  readonly temperaturaMinGrafico = -90;
  readonly temperaturaMaxGrafico = 40;

  readonly asseTemperature = [
    -80, -60, -40, -20, 0, 20, 40
  ];

  readonly asseQuote = [
    0, 2000, 4000, 6000,
    8000, 10000, 12000,
    14000, 16000
  ];

  readonly stazioniOsservate = [
    { nome: 'Pratica di Mare', id: 'ITM00016245' },
    { nome: 'San Pietro Capofiume', id: 'ITM00016144' },
    { nome: 'Udine / Rivolto', id: 'ITM00016045' },
    { nome: 'Novara / Cameri', id: 'ITM00016064' },
    { nome: 'Lecce', id: 'ITM00016332' },
    { nome: 'Trapani Birgi', id: 'ITM00016429' },
    { nome: 'Decimomannu', id: 'ITM00016546' }
  ];

  stazioneOsservata = 'ITM00016245';
  caricamentoOsservazioni = false;
  erroreOsservazioni = '';
  lanciOsservati: LancioOsservato[] = [];
  lancioSelezionato = '';
  urlArchivioOsservazioni = '';
  private richiestaOsservazioni = 0;

  get lancioCorrente(): LancioOsservato | undefined {
    return this.lanciOsservati.find(l => l.id === this.lancioSelezionato);
  }

  get livelliOsservati(): LivelloOsservato[] {
    return this.lancioCorrente?.livelli || [];
  }

  get osservato850(): LivelloOsservato | undefined {
    return this.livelliOsservati.find(l => l.pressione === 850);
  }
  get osservato700(): LivelloOsservato | undefined {
    return this.livelliOsservati.find(l => l.pressione === 700);
  }
  get osservato500(): LivelloOsservato | undefined {
    return this.livelliOsservati.find(l => l.pressione === 500);
  }

  private readonly distruzione$ = new Subject<void>();
  private numeroRichiesta = 0;

  constructor(
    private seo: SEOService,
    protected router: Router,
    public utilityService: UtiliyService,
    private http: HttpClient
  ) {

    this.title =
      'Radiosondaggi e Temperature in Quota - Meteo Campoli';

    this.description =
      'Radiosondaggi di Pratica di Mare e altre stazioni italiane.' +
      'Monitoraggio temperature in quota, umidità e vento.';

    this.keywords =
      'radiosondaggi, radiosondaggi reali, radiosondaggio Pratica di Mare, ' +
      'temperature in quota, temperatura 850 hPa, temperatura 700 hPa, ' +
      'temperatura 500 hPa, NOAA IGRA, Open-Meteo, ' +
      'Campoli Appennino, Sora, zero termico, umidità, vento';

    this.ogUrl =
      'https://meteocampoli.altervista.org' +
      '/dati-attuali/radio-sondaggi';

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

    // Ricarica i dati ogni 30 minuti.
    timer(0, 30 * 60 * 1000)
      .pipe(takeUntil(this.distruzione$))
      .subscribe(() => this.caricaDati());

    this.caricaRadiosondaggi();
  }

  ngOnDestroy(): void {
    this.richiestaOsservazioni++;
    this.distruzione$.next();
    this.distruzione$.complete();
  }

  // Collegamento alla fonte dei radiosondaggi realmente osservati.
  // Il CSV non è richiesto da Angular a causa del CORS di Wyoming.
  readonly urlRadiosondaggiReali =
    'https://weather.uwyo.edu/upperair/sounding.shtml';

  get luogoCorrente(): LocalitaQuota {
    return this.localita[this.localitaSelezionata];
  }

  get oraSelezionata(): OraDisponibile | null {
    return this.oreDisponibili.find(
      ora => ora.indice === this.indiceOraSelezionata
    ) || null;
  }

  get temperatura850(): LivelloQuota | undefined {
    return this.livelli.find(
      l => l.pressione === 850
    );
  }

  get temperatura700(): LivelloQuota | undefined {
    return this.livelli.find(
      l => l.pressione === 700
    );
  }

  get temperatura500(): LivelloQuota | undefined {
    return this.livelli.find(
      l => l.pressione === 500
    );
  }

  cambiaLocalita(valore: string): void {
    const indice = Number(valore);

    if (
      !Number.isInteger(indice) ||
      indice < 0 ||
      indice >= this.localita.length
    ) {
      return;
    }

    this.localitaSelezionata = indice;
    this.caricaDati();
  }

  cambiaOra(valore: string): void {
    const indice = Number(valore);

    if (
      !Number.isInteger(indice) ||
      !this.oreDisponibili.some(
        ora => ora.indice === indice
      )
    ) {
      return;
    }

    this.indiceOraSelezionata = indice;
    this.aggiornaLivelli();
  }

  spostaOra(direzione: number): void {
    const nuovoIndice =
      this.indiceOraSelezionata + direzione;

    if (
      nuovoIndice < 0 ||
      nuovoIndice >= this.oreDisponibili.length
    ) {
      return;
    }

    this.indiceOraSelezionata = nuovoIndice;
    this.aggiornaLivelli();
  }

  tornaOraCorrente(): void {
    if (this.indiceOraCorrente < 0) {
      return;
    }

    this.indiceOraSelezionata =
      this.indiceOraCorrente;

    this.aggiornaLivelli();
  }

  caricaDati(): void {
    const idRichiesta = ++this.numeroRichiesta;
    const luogo = this.luogoCorrente;

    this.caricamento = true;
    this.errore = '';

    const campi: string[] = [];

    this.pressioni.forEach(pressione => {
      campi.push('temperature_' + pressione + 'hPa');
      campi.push('dew_point_' + pressione + 'hPa');
      campi.push('relative_humidity_' + pressione + 'hPa');
      campi.push('wind_speed_' + pressione + 'hPa');
      campi.push('wind_direction_' + pressione + 'hPa');
      campi.push('geopotential_height_' + pressione + 'hPa');
    });

    const params = new HttpParams()
      .set('latitude', String(luogo.latitudine))
      .set('longitude', String(luogo.longitudine))
      .set('hourly', campi.join(','))
      .set('timezone', 'Europe/Rome')
      .set('temperature_unit', 'celsius')
      .set('wind_speed_unit', 'kmh')
      .set('past_hours', '12')
      .set('forecast_hours', '72');

    this.urlRichiesta =
      this.apiUrl + '?' + params.toString();

    this.http.get<RispostaOpenMeteo>(
      this.apiUrl,
      { params: params }
    ).subscribe({
      next: risposta => {
        if (idRichiesta !== this.numeroRichiesta) {
          return;
        }

        this.caricamento = false;

        if (
          risposta.error ||
          !risposta.hourly ||
          !Array.isArray(risposta.hourly.time) ||
          !risposta.hourly.time.length
        ) {
          this.errore =
            risposta.reason ||
            'Open-Meteo non ha restituito dati validi.';

          this.azzeraDati();
          return;
        }

        // Se stavamo consultando un orario specifico,
        // lo manteniamo dopo l'aggiornamento.
        const vecchiaData =
          this.oraSelezionata?.data || '';

        this.risposta = risposta;

        this.oreDisponibili =
          risposta.hourly.time.map((data, indice) => ({
            indice: indice,
            data: data,
            etichetta: this.formattaDataOra(data)
          }));

        this.indiceOraCorrente =
          this.trovaOraCorrente(
            risposta.hourly.time
          );

        const indicePrecedente =
          this.oreDisponibili.findIndex(
            ora => ora.data === vecchiaData
          );

        this.indiceOraSelezionata =
          indicePrecedente >= 0
            ? indicePrecedente
            : this.indiceOraCorrente;

        this.ultimoAggiornamento =
          new Date().toLocaleString('it-IT');

        this.aggiornaLivelli();
      },
      error: errore => {
        if (idRichiesta !== this.numeroRichiesta) {
          return;
        }

        console.error(
          'Errore API Open-Meteo:',
          errore
        );

        this.caricamento = false;
        this.errore =
          'Impossibile recuperare le temperature ' +
          'in quota da Open-Meteo.';

        this.azzeraDati();
      }
    });
  }

  private azzeraDati(): void {
    this.risposta = null;
    this.oreDisponibili = [];
    this.indiceOraSelezionata = -1;
    this.indiceOraCorrente = -1;
    this.livelli = [];
    this.zeroTermico = null;
    this.temperaturaMinima = null;
    this.temperaturaMassima = null;
    this.puntiTemperatura = '';
    this.puntiRugiada = '';
  }

  private trovaOraCorrente(
    date: string[]
  ): number {
    const adesso = new Date();

    const formato = new Intl.DateTimeFormat(
      'sv-SE',
      {
        timeZone: 'Europe/Rome',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hourCycle: 'h23'
      }
    );

    const parti = formato.formatToParts(adesso);

    const leggi = (tipo: string): string =>
      parti.find(p => p.type === tipo)?.value || '';

    const adessoLocale =
      leggi('year') + '-' +
      leggi('month') + '-' +
      leggi('day') + 'T' +
      leggi('hour') + ':00';

    let migliore = 0;

    for (let i = 0; i < date.length; i++) {
      if (date[i] <= adessoLocale) {
        migliore = i;
      } else {
        break;
      }
    }

    return migliore;
  }

  private formattaDataOra(data: string): string {
    const parti = data.split('T');
    const dataParti = parti[0].split('-');

    return (
      dataParti[2] + '/' +
      dataParti[1] + '/' +
      dataParti[0] + ' - ' +
      (parti[1] || '').slice(0, 5)
    );
  }

  private valore(
    campo: string,
    indice: number
  ): number | null {
    const valori =
      this.risposta?.hourly?.[campo];

    if (!Array.isArray(valori)) {
      return null;
    }

    const valore = valori[indice];

    if (
      typeof valore !== 'number' ||
      !Number.isFinite(valore)
    ) {
      return null;
    }

    return valore;
  }

  private aggiornaLivelli(): void {
    if (
      !this.risposta?.hourly ||
      this.indiceOraSelezionata < 0
    ) {
      return;
    }

    const indice = this.indiceOraSelezionata;

    this.livelli = this.pressioni.map(pressione => {
      const suffisso = pressione + 'hPa';

      return {
        pressione: pressione,
        quota: this.valore(
          'geopotential_height_' + suffisso,
          indice
        ),
        temperatura: this.valore(
          'temperature_' + suffisso,
          indice
        ),
        rugiada: this.valore(
          'dew_point_' + suffisso,
          indice
        ),
        umidita: this.valore(
          'relative_humidity_' + suffisso,
          indice
        ),
        vento: this.valore(
          'wind_speed_' + suffisso,
          indice
        ),
        direzione: this.valore(
          'wind_direction_' + suffisso,
          indice
        )
      };
    });

    this.calcolaStatistiche();
    this.calcolaGrafico();
  }

  private calcolaStatistiche(): void {
    const validi = this.livelli
      .filter(
        l =>
          l.quota !== null &&
          l.temperatura !== null
      )
      .sort(
        (a, b) => (a.quota as number) -
          (b.quota as number)
      );

    this.zeroTermico = null;
    this.temperaturaMinima = null;
    this.temperaturaMassima = null;

    if (!validi.length) {
      return;
    }

    const temperature = validi.map(
      l => l.temperatura as number
    );

    this.temperaturaMinima =
      Math.min(...temperature);

    this.temperaturaMassima =
      Math.max(...temperature);

    // Primo passaggio da temperatura positiva
    // a temperatura nulla o negativa.
    // Non viene estrapolato sotto il livello
    // di pressione più basso disponibile.
    for (let i = 0; i < validi.length - 1; i++) {
      const a = validi[i];
      const b = validi[i + 1];

      const ta = a.temperatura as number;
      const tb = b.temperatura as number;
      const za = a.quota as number;
      const zb = b.quota as number;

      if (ta === 0) {
        this.zeroTermico = za;
        break;
      }

      if (ta > 0 && tb <= 0) {
        const frazione = ta / (ta - tb);

        this.zeroTermico =
          za + (zb - za) * frazione;
        break;
      }
    }
  }

  private puntoX(temperatura: number): number {
    return (
      58 +
      (temperatura - this.temperaturaMinGrafico) /
      (this.temperaturaMaxGrafico -
        this.temperaturaMinGrafico) * 700
    );
  }

  private puntoY(quota: number): number {
    return (
      350 -
      quota / this.quotaMassimaGrafico * 310
    );
  }

  getX(temperatura: number): number {
    return this.puntoX(temperatura);
  }

  getY(quota: number): number {
    return this.puntoY(quota);
  }

  private calcolaGrafico(): void {
    const validi = this.livelli
      .filter(
        l =>
          l.quota !== null &&
          l.temperatura !== null &&
          l.quota >= 0 &&
          l.quota <= this.quotaMassimaGrafico
      )
      .sort(
        (a, b) =>
          (a.quota as number) -
          (b.quota as number)
      );

    this.puntiTemperatura = validi
      .map(
        l =>
          this.puntoX(l.temperatura as number) +
          ',' +
          this.puntoY(l.quota as number)
      )
      .join(' ');

    this.puntiRugiada = validi
      .filter(l => l.rugiada !== null)
      .map(
        l =>
          this.puntoX(l.rugiada as number) +
          ',' +
          this.puntoY(l.quota as number)
      )
      .join(' ');
  }


  cambiaStazioneOsservata(id: string): void {
    if (!this.stazioniOsservate.some(s => s.id === id)) {
      return;
    }
    this.stazioneOsservata = id;
    this.caricaRadiosondaggi();
  }

  cambiaLancioOsservato(id: string): void {
    if (this.lanciOsservati.some(l => l.id === id)) {
      this.lancioSelezionato = id;
    }
  }

  async caricaRadiosondaggi(): Promise<void> {
    const richiesta = ++this.richiestaOsservazioni;
    this.caricamentoOsservazioni = true;
    this.erroreOsservazioni = '';
    this.lanciOsservati = [];
    this.lancioSelezionato = '';

    const anno = new Date().getUTCFullYear();
    const nome = `${this.stazioneOsservata}-data-beg${anno}.txt.zip`;
    const url = `https://www.ncei.noaa.gov/pub/data/igra/data/data-y2d/${nome}`;
    this.urlArchivioOsservazioni = url;

    try {
      // L'archivio è ZIP: viene scaricato e decompresso nel browser.
      // Se il server NOAA blocca CORS si visualizza un messaggio,
      // senza interferire con la sezione Open-Meteo.
      const buffer = await this.http.get(url, {
        responseType: 'arraybuffer'
      }).toPromise();
      if (!buffer) {
        throw new Error('Archivio NOAA vuoto');
      }

      const zip = await JSZip.loadAsync(buffer);

      const files: JSZip.JSZipObject[] =
        Object.keys(zip.files).map(
          nome => zip.files[nome]
        );

      const file = files.find(
        (item: JSZip.JSZipObject) =>
          !item.dir &&
          item.name.toLowerCase().endsWith('.txt')
      );

      if (!file) {
        throw new Error(
          'File dati IGRA non presente nello ZIP'
        );
      }

      const testo = await file.async('string');

      const lanci = this.leggiArchivioIgra(testo);
      if (richiesta !== this.richiestaOsservazioni) {
        return;
      }
      this.lanciOsservati = lanci.slice(-40).reverse();
      this.lancioSelezionato = this.lanciOsservati[0]?.id || '';
      if (!lanci.length) {
        this.erroreOsservazioni = 'Non risultano lanci validi nell’archivio NOAA selezionato.';
      }
    } catch (errore) {
      if (richiesta !== this.richiestaOsservazioni) {
        return;
      }
      console.error('Errore archivio IGRA:', errore);
      this.erroreOsservazioni =
        'Impossibile scaricare i radiosondaggi NOAA. Verifica la connessione e le restrizioni CORS del server; puoi comunque aprire l’archivio dalla fonte.';
    } finally {
      if (richiesta === this.richiestaOsservazioni) {
        this.caricamentoOsservazioni = false;
      }
    }
  }

  private leggiNumeroIgra(riga: string, da: number, a: number, divisore = 1): number | null {
    const testo = riga.slice(da, a).trim();
    if (!testo) { return null; }
    const valore = Number(testo);
    if (!Number.isFinite(valore) || valore <= -8888) {
      return null;
    }
    return valore / divisore;
  }

  private leggiArchivioIgra(testo: string): LancioOsservato[] {
    const righe = testo.split(/\r?\n/);
    const lanci: LancioOsservato[] = [];
    for (let i = 0; i < righe.length; i++) {
      const intestazione = righe[i];
      if (!intestazione.startsWith('#')) {
        continue;
      }
      const anno = intestazione.slice(13, 17).trim();
      const mese = intestazione.slice(18, 20).trim();
      const giorno = intestazione.slice(21, 23).trim();
      const ora = intestazione.slice(24, 26).trim();
      const numeroLivelli = Number(intestazione.slice(32, 36).trim());
      if (!Number.isInteger(numeroLivelli) || numeroLivelli < 0 || numeroLivelli > 10000) {
        continue;
      }
      const livelli: LivelloOsservato[] = [];
      for (let j = 0; j < numeroLivelli && i + 1 < righe.length; j++) {
        const riga = righe[++i];
        const pressionePa = this.leggiNumeroIgra(riga, 9, 15);
        if (pressionePa === null) {
          continue;
        }
        const temperatura = this.leggiNumeroIgra(riga, 22, 27, 10);
        const depressione = this.leggiNumeroIgra(riga, 34, 39, 10);
        const ventoMs = this.leggiNumeroIgra(riga, 46, 51, 10);
        livelli.push({
          pressione: pressionePa / 100,
          quota: this.leggiNumeroIgra(riga, 16, 21),
          temperatura,
          rugiada: temperatura !== null && depressione !== null
            ? temperatura - depressione : null,
          umidita: this.leggiNumeroIgra(riga, 28, 33, 10),
          vento: ventoMs === null ? null : ventoMs * 3.6,
          direzione: this.leggiNumeroIgra(riga, 40, 45)
        });
      }
      if (ora === '99' || !livelli.some(l => l.temperatura !== null)) {
        continue;
      }
      // Preferisci il livello standard riportato dalla sonda.
      // Non inventare valori per pressioni non osservate.
      const id = `${anno}-${mese}-${giorno}T${ora}:00Z`;
      lanci.push({ id, dataUtc: `${giorno}/${mese}/${anno} - ${ora}:00 UTC`, livelli });
    }
    return lanci;
  }

  formattaTemperatura(
    valore: number | null | undefined
  ): string {
    if (valore === null || valore === undefined) {
      return 'N/D';
    }

    return valore.toLocaleString('it-IT', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }) + ' °C';
  }

  formattaQuota(
    valore: number | null | undefined
  ): string {
    if (valore === null || valore === undefined) {
      return 'N/D';
    }

    return Math.round(valore)
      .toLocaleString('it-IT') + ' m';
  }

  formattaUmidita(
    valore: number | null | undefined
  ): string {
    if (valore === null || valore === undefined) {
      return 'N/D';
    }

    return Math.round(valore) + '%';
  }

  formattaVento(
    valore: number | null | undefined
  ): string {
    if (valore === null || valore === undefined) {
      return 'N/D';
    }

    return valore.toLocaleString('it-IT', {
      maximumFractionDigits: 1
    }) + ' km/h';
  }

  formattaDirezione(
    valore: number | null | undefined
  ): string {
    if (valore === null || valore === undefined) {
      return 'N/D';
    }

    return Math.round(valore) + '°';
  }
}
