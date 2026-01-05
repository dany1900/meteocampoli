import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormControl} from '@angular/forms';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {HttpClient} from '@angular/common/http';
import {StatisticheStazioneInterface} from './statistiche-stazione.interface';
import {FileService} from '../../service/file.service';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'statistiche-stazione-prato',
  templateUrl: './statistiche-stazione-prato.component.html',
  styleUrls: ['./statistiche-stazione-prato.component.css']
})
export class StatisticheStazionePratoComponent implements OnInit, AfterViewInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  imageLoader = true;
  imageLoaderAnno = true;
  arrResponse: StatisticheStazioneInterface[] = [];
  arrResponseAnno: StatisticheStazioneInterface[] = [];
  displayedColumns: string[] = ['giorno', 'tempMin', 'tempMax', 'tempMedia', 'vento', 'pressione', 'umidita', 'pioggia'];
  displayedColumnsAnno: string[] = ['tempMin', 'tempMax', 'tempMedia', 'vento', 'pressione', 'pioggiaGiornalieraMax', 'pioggia'];
  dataSource = new MatTableDataSource<StatisticheStazioneInterface>(this.arrResponse);
  dataSourceAnno = new MatTableDataSource<StatisticheStazioneInterface>(this.arrResponseAnno);
  isVisible = false;
  isVisibleAnno = false;

  @ViewChild('paginatorMese') paginator!: MatPaginator;
  @ViewChild('paginatorAnno') paginatorAnno!: MatPaginator;

  @ViewChild('sortMese') sortMese!: MatSort;
  @ViewChild('sortAnno') sortAnno!: MatSort;

  public pageSize;
  public currentPage;
  public pageSizeAnno;
  public currentPageAnno = 1;
  public totalSize;
  pageEvent: PageEvent;
  pageEventAnno: PageEvent;

  // Array dei nomi dei mesi
  months: string[] = [
    'Gennaio',   // 0
    'Febbraio',  // 1
    'Marzo',     // 2
    'Aprile',    // 3
    'Maggio',    // 4
    'Giugno',    // 5
    'Luglio',    // 6
    'Agosto',    // 7
    'Settembre', // 8
    'Ottobre',   // 9
    'Novembre',  // 10
    'Dicembre'   // 11
  ];

  csvDataMese: any[] = [];  // I dati CSV mese caricati
  csvDataAnno: any[] = [];  // I dati CSV anno caricati
  csvDataMonthly: any[] = [];  // I dati CSV caricati ordinati
  month: string;
  year: number;
  yearMonth: number;
  today: Date;
  precYear: number;
  dateControl = new FormControl(new Date());  // Imposta la data odierna
  dateControlAnnuale = new FormControl(new Date());  // Imposta la data odierna
  csvUrlMese: string;  // URL del file CSV
  csvAnnoPath: string;  // URL del file CSV anno
  currentMonthIndex = new Date().getMonth(); // 0..11
  startYear = 2024;
  availableYears: number;
  currentYearIndex: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService, private http: HttpClient, public renderer: Renderer2,
              private fb: FormBuilder, private fileService: FileService) {
    this.title = 'Statistiche Stazione Loc.Prato - Meteo Campoli';
    this.description = 'Riepilogo stazione meteo campoli appennino località prato. Tutte le statistiche complete per ogni giorno, mese ed anno';
    this.keywords = 'staatistiche meteo campoli, statistiche stazione prato campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/riepilogo/stazione-prato';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();

  }

  ngOnInit() {
    this.utilityService.scrollToSpecifyPosition();
    this.today = new Date();
    this.availableYears = this.today.getFullYear() - this.startYear + 1; // es. 2013..2026
    this.currentYearIndex = this.today.getFullYear() - this.startYear;
    this.year = this.today.getFullYear();
    this.yearMonth = this.year;
    this.month = (this.today.getMonth() + 1).toString();
    this.currentPage = this.today.getMonth();
    if (Number(this.month) <= 9) {
      this.month = '0' + this.month.toString();
    }
    this.loadCSVMeseData();
    this.loadCSVAnnoData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortMese;

    this.dataSourceAnno.paginator = this.paginatorAnno;
    this.dataSourceAnno.sort = this.sortAnno;
  }

  // ==============================
//  ANNO (riepilogo annuale)
// ==============================
  loadCSVAnnoData(): void {
    this.imageLoaderAnno = true;
    this.isVisibleAnno = false;

    // IMPORTANT: reset per evitare duplicati quando ricarichi anno
    this.arrResponseAnno = [];
    this.dataSourceAnno.data = [];

    this.csvAnnoPath = `assets/storico-prato/${this.year}.csv`;

    this.fileService.getCSV(this.csvAnnoPath).subscribe({
      next: (res) => {
        this.csvDataAnno = this.fileService.parseCSV(res, ',');

        let minTemperature = Infinity;
        let maxTemperature = -Infinity;

        let tempSum = 0;
        let tempCount = 0;

        let windMax = 0;

        let minUr = Infinity;
        let maxUr = -Infinity;

        let minPress = Infinity;
        let maxPress = -Infinity;

        let maxPioggiaEvento = 0;

        for (const row of this.csvDataAnno) {
          const temp = parseFloat(row['Temperatura esterna(℃)']);
          if (!Number.isNaN(temp)) {
            minTemperature = Math.min(minTemperature, temp);
            maxTemperature = Math.max(maxTemperature, temp);
            tempSum += temp;
            tempCount++;
          }

          const wind = parseFloat(row['Raffica(km/h)']) || 0;
          windMax = Math.max(windMax, wind);

          const ur = parseFloat(row['Umidità esterna(%)']);
          if (!Number.isNaN(ur)) {
            minUr = Math.min(minUr, ur);
            maxUr = Math.max(maxUr, ur);
          }

          const stationPress = parseFloat(row['Pressione ass.(hpa)']);
          if (!Number.isNaN(stationPress)) {
            const sea = this.calculateSeaLevelPressure(stationPress, 586);
            if (!Number.isNaN(sea)) {
              minPress = Math.min(minPress, sea);
              maxPress = Math.max(maxPress, sea);
            }
          }

          const pioggiaEvento = parseFloat(row[`Pioggia dell'evento(mm)`]) || 0;
          maxPioggiaEvento = Math.max(maxPioggiaEvento, pioggiaEvento);
        }

        // Edge-cases: file vuoto / tutto NaN
        const annualAvg = tempCount ? (tempSum / tempCount).toFixed(1) : null;
        const tempMinOut = minTemperature !== Infinity ? minTemperature.toFixed(1) : null;
        const tempMaxOut = maxTemperature !== -Infinity ? maxTemperature.toFixed(1) : null;

        const urMinOut = minUr !== Infinity ? minUr.toFixed(0) : null;
        const urMaxOut = maxUr !== -Infinity ? maxUr.toFixed(0) : null;

        const pressMinOut = minPress !== Infinity ? minPress.toFixed(1) : null;
        const pressMaxOut = maxPress !== -Infinity ? maxPress.toFixed(1) : null;

        const rainYear =
          this.csvDataAnno?.length
            ? (this.csvDataAnno[this.csvDataAnno.length - 1]['Pioggia annuale(mm)'] ?? null)
            : null;

        this.arrResponseAnno.push({
          giorno: 'Annuale',
          tempMin: tempMinOut,
          tempMax: tempMaxOut,
          tempMedia: annualAvg,
          ventoMax: windMax ? windMax.toFixed(0) : '0',
          umiditaMax: urMaxOut,
          umiditaMin: urMinOut,
          pressioneMax: pressMaxOut,
          pressioneMin: pressMinOut,
          pioggiaMaxEvento: maxPioggiaEvento.toFixed(1),
          pioggia: rainYear
        });

        this.dataSourceAnno.data = this.arrResponseAnno;

        // paginator anno (se lo usi come “fake pager”) – qui non forzo length
        this.imageLoaderAnno = false;
        this.isVisibleAnno = true;
        this.utilityService.scrollToSpecifyPosition();
      },
      error: () => {
        // fallback: nessun file per quell’anno
        this.dataSourceAnno.data = [];
        this.arrResponseAnno = [];

        if (this.paginatorAnno) {
          this.paginatorAnno.length = 0;
        }

        this.imageLoaderAnno = false;
        this.isVisibleAnno = true;
        this.utilityService.scrollToSpecifyPosition();
      }
    });
  }


// ==============================
//  MESE (riepilogo giornaliero + riga Mensile)
// ==============================
  loadCSVMeseData(): void {
    this.imageLoader = true;
    this.isVisible = false;

    // IMPORTANT: reset per evitare accumuli su cambio mese/anno
    this.arrResponse = [];
    this.dataSource.data = [];

    this.csvUrlMese = `assets/storico-prato/${this.year}${this.month}.csv`;

    // Contenitore aggregati giornalieri
    const daily: {
      [dayKey: string]: {
        giorno: string;
        tempMin: number;
        tempMax: number;
        tempSum: number;
        tempCount: number;

        ventoMax: number;

        urMin: number;
        urMax: number;

        pressMin: number;
        pressMax: number;

        pioggiaGiornoMax: number; // nel tuo CSV sembra “cumulata giorno”: uso max come facevi
        pioggiaMese: number;      // cumulata mese (ultimo valore utile)
        pioggiaAnno: number;      // cumulata anno (ultimo valore utile)
      };
    } = {};

    // Per media mensile “vera” su tutte le righe (non media delle medie giornaliere)
    let monthTempSum = 0;
    let monthTempCount = 0;

    this.fileService.getCSV(this.csvUrlMese).subscribe({
      next: (csvText) => {
        this.csvDataMese = this.fileService.parseCSV(csvText, ',');

        for (const row of this.csvDataMese) {
          const dateObj = new Date(row.ora);
          if (Number.isNaN(dateObj.getTime())) {
            continue; // riga senza data valida
          }

          // Filtra per mese selezionato (dovrebbe già essere così, ma teniamolo)
          if (dateObj.getMonth() !== this.dateControl.value.getMonth()) {
            continue;
          }

          const dayKey = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;

          const dayLabel = dateObj.getDate().toString().padStart(2, '0');

          const t = parseFloat(row['Temperatura esterna(℃)']);
          const wind = parseFloat(row['Raffica(km/h)']) || 0;

          const urVal = parseFloat(row['Umidità esterna(%)']);
          const stationPress = parseFloat(row['Pressione ass.(hpa)']);
          const press = !Number.isNaN(stationPress)
            ? this.calculateSeaLevelPressure(stationPress, 586)
            : NaN;

          const rainDay = parseFloat(row['Piog. Giorno(mm)']) || 0;
          const rainMese = parseFloat(row['Pioggia mensile(mm)']) || 0;
          const rainAnno = parseFloat(row['Pioggia annuale(mm)']) || 0;

          // mese: media vera su tutte le righe
          if (!Number.isNaN(t)) {
            monthTempSum += t;
            monthTempCount++;
          }

          if (!daily[dayKey]) {
            // Inizializzazione con valori “sicuri”
            daily[dayKey] = {
              giorno: dayLabel,
              tempMin: Number.isNaN(t) ? Infinity : t,
              tempMax: Number.isNaN(t) ? -Infinity : t,
              tempSum: Number.isNaN(t) ? 0 : t,
              tempCount: Number.isNaN(t) ? 0 : 1,

              ventoMax: wind,

              urMin: Number.isNaN(urVal) ? Infinity : urVal,
              urMax: Number.isNaN(urVal) ? -Infinity : urVal,

              pressMin: Number.isNaN(press) ? Infinity : press,
              pressMax: Number.isNaN(press) ? -Infinity : press,

              pioggiaGiornoMax: rainDay,
              pioggiaMese: rainMese,
              pioggiaAnno: rainAnno
            };
          } else {
            // Temperature
            if (!Number.isNaN(t)) {
              daily[dayKey].tempMin = Math.min(daily[dayKey].tempMin, t);
              daily[dayKey].tempMax = Math.max(daily[dayKey].tempMax, t);
              daily[dayKey].tempSum += t;
              daily[dayKey].tempCount++;
            }

            // vento max
            daily[dayKey].ventoMax = Math.max(daily[dayKey].ventoMax, wind);

            // umidità min/max
            if (!Number.isNaN(urVal)) {
              daily[dayKey].urMin = Math.min(daily[dayKey].urMin, urVal);
              daily[dayKey].urMax = Math.max(daily[dayKey].urMax, urVal);
            }

            // pressione min/max
            if (!Number.isNaN(press)) {
              daily[dayKey].pressMin = Math.min(daily[dayKey].pressMin, press);
              daily[dayKey].pressMax = Math.max(daily[dayKey].pressMax, press);
            }

            // pioggia giorno: nel tuo codice usi max (probabilmente perché è già “cumulata giorno”)
            daily[dayKey].pioggiaGiornoMax = Math.max(daily[dayKey].pioggiaGiornoMax, rainDay);

            // cumulati mese/anno: tieni l’ultimo valore (di solito cresce)
            daily[dayKey].pioggiaMese = rainMese;
            daily[dayKey].pioggiaAnno = rainAnno;
          }
        }

        // Trasformo in array ordinato per giorno
        const daysSorted = Object.keys(daily).sort(); // YYYY-MM-DD => ordine corretto
        const result: StatisticheStazioneInterface[] = daysSorted.map((k) => {
          const d = daily[k];

          const tMin = d.tempMin !== Infinity ? d.tempMin : null;
          const tMax = d.tempMax !== -Infinity ? d.tempMax : null;
          const tAvg = d.tempCount ? (d.tempSum / d.tempCount) : null;

          return {
            giorno: d.giorno,
            tempMin: tMin !== null ? tMin.toFixed(1) : null,
            tempMax: tMax !== null ? tMax.toFixed(1) : null,
            tempMedia: tAvg !== null ? tAvg.toFixed(1) : null,
            ventoMax: d.ventoMax.toFixed(0),
            umiditaMin: d.urMin !== Infinity ? d.urMin.toFixed(0) : null,
            umiditaMax: d.urMax !== -Infinity ? d.urMax.toFixed(0) : null,
            pressioneMin: d.pressMin !== Infinity ? d.pressMin.toFixed(1) : null,
            pressioneMax: d.pressMax !== -Infinity ? d.pressMax.toFixed(1) : null,
            pioggia: d.pioggiaGiornoMax.toFixed(1),
            pioggiaMese: d.pioggiaMese.toFixed(1),
            pioggiaAnno: d.pioggiaAnno.toFixed(1)
          };
        });

        // Riepilogo mensile (estremi + media mensile vera)
        const numeric = (v: any) => (v === null || v === undefined || v === '' ? NaN : parseFloat(v));

        const tempMinEstrema = Math.min(...result.map(r => numeric(r.tempMin)).filter(v => !Number.isNaN(v)));
        const tempMaxEstrema = Math.max(...result.map(r => numeric(r.tempMax)).filter(v => !Number.isNaN(v)));
        const ventoMaxEstremo = Math.max(...result.map(r => numeric(r.ventoMax)).filter(v => !Number.isNaN(v)));

        const umiditaEstremaMin = Math.min(...result.map(r => numeric(r.umiditaMin)).filter(v => !Number.isNaN(v)));
        const umiditaEstremaMax = Math.max(...result.map(r => numeric(r.umiditaMax)).filter(v => !Number.isNaN(v)));

        const pressioneEstremaMin = Math.min(...result.map(r => numeric(r.pressioneMin)).filter(v => !Number.isNaN(v)));
        const pressioneEstremaMax = Math.max(...result.map(r => numeric(r.pressioneMax)).filter(v => !Number.isNaN(v)));

        // pioggia mese: prendo l’ultimo valore disponibile del cumulato mese
        const lastRainMese = result.length ? (result[result.length - 1].pioggiaMese ?? null) : null;

        const tempMediaMensileVera =
          monthTempCount ? (monthTempSum / monthTempCount).toFixed(1) : null;

        result.push({
          giorno: 'Mensile',
          tempMin: Number.isFinite(tempMinEstrema) ? tempMinEstrema.toFixed(1) : null,
          tempMax: Number.isFinite(tempMaxEstrema) ? tempMaxEstrema.toFixed(1) : null,
          tempMedia: tempMediaMensileVera,
          ventoMax: Number.isFinite(ventoMaxEstremo) ? ventoMaxEstremo.toFixed(0) : '0',
          umiditaMin: Number.isFinite(umiditaEstremaMin) ? umiditaEstremaMin.toFixed(0) : null,
          umiditaMax: Number.isFinite(umiditaEstremaMax) ? umiditaEstremaMax.toFixed(0) : null,
          pressioneMin: Number.isFinite(pressioneEstremaMin) ? pressioneEstremaMin.toFixed(1) : null,
          pressioneMax: Number.isFinite(pressioneEstremaMax) ? pressioneEstremaMax.toFixed(1) : null,
          pioggia: lastRainMese
        });

        this.arrResponse = result;
        this.dataSource.data = this.arrResponse;

        // Mantieni coerente l’header (mese/anno mostrati)
        this.yearMonth = this.year;

        // Se il paginator lo usi come “cambio mese”:
        // pageIndex deve essere 0..11 (mese)
        this.currentPage = this.dateControl.value.getMonth();

        // Se vuoi: abilita frecce solo quando esiste file mese:
        if (this.paginator) {
          // lunghezza 12 pagine (mesi)
          this.paginator.length = 12;
        }

        this.imageLoader = false;
        this.isVisible = true;
        this.utilityService.scrollToSpecifyPosition();
      },
      error: () => {
        // File mese inesistente
        this.arrResponse = [];
        this.dataSource.data = [];

        if (this.paginator) {
          this.paginator.length = 12; // mantieni comunque 12 mesi
        }

        this.imageLoader = false;
        this.isVisible = true;
        this.utilityService.scrollToSpecifyPosition();
      }
    });
  }


  // Funzione per calcolare il colore in base al valore
  getCellColor(value: number): string {
    const minValue = -20.0;  // Valore minimo (blu)
    const maxValue = 50.0; // Valore massimo (rosso scuro)
    if (value <= 5) {
      // Transizione da blu a verdino (0°C)
      const normalizedValue = (value - minValue) / (5 - minValue); // Normalizza tra -20 e 0
      const blue = Math.floor(255 * (1 - normalizedValue) * 3);  // Blu scuro a verdino
      const green = Math.floor(255 * normalizedValue);       // Aumenta il verde verso 0°C
      return 'rgb(0, ' + green.toString() + ', ' + blue.toString() + ')';

    } else {
      // Transizione da verdino a rosso (0°C a 40°C)
      const normalizedValue = (value - 0) / (maxValue - 0); // Normalizza tra 0 e 40
      const red = Math.floor(255 * normalizedValue);        // Aumenta il rosso verso 40°C
      const green = Math.floor(255 * (1 - normalizedValue) - 20); // Diminuisce il verde
      return 'rgb(' + red.toString() + ', ' + green.toString() + ', 0)';
    }
  }

  // Funzione per calcolare il colore in base al valore
  // Funzione per calcolare il colore in base al valore
  getPioggiaColor(value: number): string {
    const minValue = 0;   // Valore minimo (celestino)
    const midValue = 0.5; // Valore medio (verdino)
    const maxValue = 150; // Valore massimo (rosso scuro)

    if (value <= midValue) {
      // Transizione da celestino a verdino (0 a 0.5)
      const normalizedValue = value / midValue; // Normalizza tra 0 e 0.5
      const red = Math.floor(173 * (1 - normalizedValue)); // Diminuisce il blu (celestino -> verdino)
      const green = Math.floor(216 * normalizedValue);     // Aumenta il verde (celestino -> verdino)
      return 'rgb(' + red.toString() + ', 230, 230)';
    } else {
      // Transizione da verdino a rosso scuro (0.5 a 200)
      const normalizedValue = (value - midValue) / (maxValue - midValue); // Normalizza tra 0.5 e 200
      const red = Math.floor(139 * normalizedValue + 0 * (1 - normalizedValue));  // Aumenta il rosso (verdino -> rosso scuro)
      const green = Math.floor(255 * (1 - normalizedValue)); // Diminuisce il verde (verdino -> rosso scuro)
      return 'rgb(' + red.toString() + ', ' + green.toString() + ', 180)';
    }
  }

  // Funzione per calcolare il colore in base al valore
  getUmiditaColor(value: number): string {
    const minValue = 0;   // Valore minimo (celestino)
    const midValue = 0.5; // Valore medio (verdino)
    const maxValue = 100; // Valore massimo (rosso scuro)

    if (value <= midValue) {
      // Transizione da celestino a verdino (0 a 0.5)
      const normalizedValue = value / midValue; // Normalizza tra 0 e 0.5
      const red = Math.floor(173 * (1 - normalizedValue)); // Diminuisce il blu (celestino -> verdino)
      const green = Math.floor(216 * normalizedValue);     // Aumenta il verde (celestino -> verdino)
      return 'rgb(' + red.toString() + ', 230, 230)';
    } else {
      // Transizione da verdino a rosso scuro (0.5 a 200)
      const normalizedValue = (value - midValue) / (maxValue - midValue); // Normalizza tra 0.5 e 200
      const red = Math.floor(139 * normalizedValue + 0 * (1 - normalizedValue));  // Aumenta il rosso (verdino -> rosso scuro)
      const green = Math.floor(255 * (1 - normalizedValue)); // Diminuisce il verde (verdino -> rosso scuro)
      return 'rgb(' + red.toString() + ', ' + green.toString() + ', 127)';
    }
  }

  // Funzione per calcolare il colore in base al valore (transizione bianco -> grigio -> rosso)
  getVentoColor(value: number): string {
    const minValue = 0;    // Valore minimo (bianco)
    const midValue = 70;   // Valore intermedio (inizio transizione verso rosso)
    const maxValue = 150;  // Valore massimo (rosso)

    if (value <= minValue) {
      return 'rgb(255, 255, 255)'; // Bianco
    } else if (value >= maxValue) {
      return 'rgb(255, 0, 0)'; // Rosso
    } else if (value <= midValue) {
      // Transizione da bianco a grigio
      const normalizedValue = (value - minValue) / (midValue - minValue);
      const gray = Math.floor(255 * (1 - normalizedValue) + 80); // Dal bianco (255) al grigio (0)

      return `rgb(${gray}, ${gray}, ${gray})`; // Colore da bianco a grigio
    } else {
      // Transizione da grigio a rosso
      const normalizedValue = (value - midValue) / (maxValue - midValue);
      const red = Math.floor(255 * normalizedValue);  // Aumenta il rosso da 0 a 255
      const gray = Math.floor(255 * (1 - normalizedValue) - 110); // Diminuisce grigio da 255 a 0

      return `rgb(255, ${red}, ${gray})`; // Da grigio a rosso
    }
  }

  // Funzione per calcolare il colore in base al valore (transizione bianco -> grigio -> rosso)
  getPressioneColor(value: number): string {
    const minValue = 1040;   // Valore massimo (celestino)
    const midValue = 1010; // Valore medio (verdino)
    const maxValue = 980; // Valore minimo (rosso scuro)

    if (value <= midValue) {
      // Transizione da celestino a verdino (0 a 0.5)
      const normalizedValue = value / midValue; // Normalizza tra 0 e 0.5
      const red = Math.floor(173 * (1 - normalizedValue)); // Diminuisce il blu (celestino -> verdino)
      const green = Math.floor(216 * normalizedValue);     // Aumenta il verde (celestino -> verdino)
      return 'rgb(' + red.toString() + ', 230, 230)';
    } else {
      // Transizione da verdino a rosso scuro (0.5 a 200)
      const normalizedValue = (value - midValue) / (maxValue - midValue); // Normalizza tra 0.5 e 200
      const red = Math.floor(139 * normalizedValue + 0 * (1 - normalizedValue));  // Aumenta il rosso (verdino -> rosso scuro)
      const green = Math.floor(255 * (1 - normalizedValue)); // Diminuisce il verde (verdino -> rosso scuro)
      return 'rgb(' + red.toString() + ', ' + green.toString() + ', 127)';
    }
  }

  // Funzione per calcolare la Pressione al Livello del Mare (SLP)
  calculateSeaLevelPressure(stationPressure: number, elevationInMeters: number): number {
    const tempRatio = 288 / (288 - 0.0065 * elevationInMeters);
    const seaLevelPressure = stationPressure * Math.pow(tempRatio, 5.2561);
    // -5 inserito ad occhio confronto alla mia
    return seaLevelPressure - 5;
  }

  // Funzione per ottenere il nome del mese da un numero
  getMonthName(monthNumber: string): string {
    // Converti il numero di mese da stringa a numero (esempio "08" -> 7)
    const monthIndex = parseInt(monthNumber, 10) - 1;

    // Verifica se il mese è valido
    if (monthIndex >= 0 && monthIndex < 12) {
      return this.months[monthIndex];
    } else {
      return 'Mese non valido';
    }
  }

  // Quando viene selezionato un anno
  chosenYearHandler(normalizedYear: Date, datepicker: any) {
    const ctrlValue = this.dateControl.value;
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.dateControl.setValue(ctrlValue);
  }

  // Quando viene selezionato un anno
  chosenYearHandlerAnnuale(normalizedYear: Date, datepicker: any) {
    const ctrlValue = this.dateControl.value;
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.dateControl.setValue(ctrlValue);
  }

  // Quando viene selezionato un mese
  chosenMonthHandler(normalizedMonth: Date, datepicker: any) {
    const ctrlValue = this.dateControl.value;
    ctrlValue.setMonth(normalizedMonth.getMonth());
    this.dateControl.setValue(ctrlValue);
    datepicker.close();  // Chiude il selettore
  }


  // Filtra i dati CSV per mese e anno
  filterData(selectedDate = this.dateControl.value, onlyYear?: boolean) {

    if (!selectedDate) {
      return;
    }


    this.month = (selectedDate.getMonth() + 1).toString();  // I mesi vanno da 0 a 11
    if (Number(this.month) <= 9) {
      this.month = '0' + this.month.toString();
    }
    this.year = selectedDate.getFullYear();
    if (this.year === 2025) {
      this.currentPageAnno = 1;
    } else {
      if (this.year < 2025) {
        this.currentPageAnno = 0;
      }
    }
    if (!onlyYear) {
      this.loadCSVMeseData();
    }
    if (this.year !== this.precYear) {
      this.arrResponseAnno = [];
      this.loadCSVAnnoData();
    }
    this.precYear = this.year;
  }

  public handlePage(e: any) {
    let month;
    if (this.month === '03') {
      if (e.previousPageIndex === 1 && e.pageIndex === 2) {
        this.currentPage = 3;
        month = 3;
      } else {
        this.currentPage = 2;
        month = 1;
      }
    } else if (this.month === '02') {
      if (e.previousPageIndex === 0 && e.pageIndex === 1) {
        this.currentPage = 2;
        month = 2;
      } else if (e.previousPageIndex === 1 && e.pageIndex === 2) {
        this.currentPage = 2;
        month = 2;
      } else {
        this.currentPage = 1;
        month = 0;
      }
    } else {
      this.currentPage = e.pageIndex + 1;
      if (e.previousPageIndex === 0 && e.pageIndex === 1) {
        month = 1;
      } else {
        if (this.currentPage === 0) {
          month = 0;
        } else {
          month = this.currentPage;
        }
      }
    }
    const selectedDate = new Date(this.year, month); // Anno, mese (da 0)
    this.dateControl.setValue(selectedDate);
    this.filterData(this.dateControl.value);
  }

  public handlePageAnno(e: any) {
    this.currentPageAnno = e.pageIndex;
    this.paginatorAnno.length = 400;
    this.dataSourceAnno.paginator = this.paginatorAnno;
    const selectedDate = new Date(e.pageIndex < e.previousPageIndex ? this.year - 1 : this.year + 1, this.dateControl.value.getMonth()); // Anno, mese (da 0)
    //this.dateControl.setValue(selectedDate);
    this.filterData(selectedDate, true);
  }

  handleMonthPager(e: PageEvent) {
    // direzione: se vai a 0 -> indietro, se vai a 2 -> avanti
    const goPrev = e.pageIndex < e.previousPageIndex;
    const delta = goPrev ? -1 : +1;

    // calcola nuova data mese
    const cur = this.dateControl?.value ?? new Date();
    const next = new Date(cur.getFullYear(), cur.getMonth() + delta, 1);

    // aggiorna form control + year/month coerenti
    this.dateControl.setValue(next);
    this.year = next.getFullYear();
    this.month = (next.getMonth() + 1).toString().padStart(2, '0');
    this.yearMonth = this.year;

    // ricarica mese
    this.loadCSVMeseData();

    // se cambia anno, ricarica annuale
    if (this.precYear !== this.year) {
      this.precYear = this.year;
      this.loadCSVAnnoData();
    }

    // IMPORTANTISSIMO: rimetti il paginator al centro (così frecce sempre attive)
    // setTimeout per evitare ExpressionChangedAfterItHasBeenChecked
    setTimeout(() => {
      this.paginator.pageIndex = 1;
      // forza update UI (alcune versioni material lo richiedono)
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

  handleYearPage(e: PageEvent) {
    const year = this.startYear + e.pageIndex;
    const selectedDate = new Date(year, this.dateControl.value.getMonth(), 1);
    this.filterData(selectedDate, true);
  }
}
