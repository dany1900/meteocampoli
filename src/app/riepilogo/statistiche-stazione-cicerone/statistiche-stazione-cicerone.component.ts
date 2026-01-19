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
  selector: 'statistiche-stazione-cicerone',
  templateUrl: './statistiche-stazione-cicerone.component.html',
  styleUrls: ['./statistiche-stazione-cicerone.component.css']
})
export class StatisticheStazioneCiceroneComponent implements OnInit, AfterViewInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  imageLoader = true;
  imageLoaderAnno = true;
  arrResponse: StatisticheStazioneInterface[] = [];
  arrResponseAnno: StatisticheStazioneInterface[] = [];
  displayedColumns: string[] = ['giorno', 'tempMin', 'tempMax', 'tempMedia', 'umidita', 'pioggia'];
  displayedColumnsAnno: string[] = ['anno', 'tempMin', 'tempMax', 'tempMedia', 'pioggia'];
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
  public currentPageAnno = 2;
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
  precYear: number;
  today: Date;
  dateControl = new FormControl(new Date());  // Imposta la data odierna
  dateControlAnnuale = new FormControl(new Date());  // Imposta la data odierna
  csvUrlMese: string;  // URL del file CSV
  csvAnnoPath: string;  // URL del file CSV anno
  startYear = 2023;
  availableYears: number;
  currentYearIndex: number;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService, private http: HttpClient, public renderer: Renderer2,
              private fb: FormBuilder, private fileService: FileService) {
    this.title = 'Statistiche Stazione Loc.Cicerone - Meteo Campoli';
    this.description = 'Riepilogo stazione meteo campoli appennino località cicerone. Tutte le statistiche complete per ogni giorno, mese ed anno';
    this.keywords = 'staatistiche meteo campoli, statistiche stazione cicerone campoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/riepilogo/stazione-cicerone';
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
    this.dataSourceAnno.paginator = this.paginatorAnno;
  }

  loadCSVAnnoData(): void {
    this.imageLoaderAnno = true;
    this.isVisibleAnno = false;

    // reset per evitare duplicati quando cambi anno o ricarichi
    this.arrResponseAnno = [];
    this.dataSourceAnno.data = [];

    // normalizza year dal dateControl (evita incoerenze con paginator)
    const selected: Date = (this.dateControl?.value ?? new Date()) as Date;
    this.year = selected.getFullYear();

    this.csvAnnoPath = `assets/storico-cicerone/cicerone-${this.year}.csv`;

    const tempField = 'Valle del Rio - Temperatura Aria - 51436 (°C)';
    const urField = 'Valle del Rio - Umidità Relativa - 51437 (%)';
    const rainField = 'Valle del Rio - Pioggia Cumulata - 51438 (mm)';

    this.fileService.getCSV(this.csvAnnoPath).subscribe({
      next: (res) => {
        this.csvDataAnno = this.fileService.parseCSV(res, ';');

        let minTemperature = Infinity;
        let maxTemperature = -Infinity;

        let tempSum = 0;
        let tempCount = 0;

        let minUr = Infinity;
        let maxUr = -Infinity;

        for (const row of this.csvDataAnno) {
          const tempRaw = parseFloat(row[tempField]);
          const temp = Number.isNaN(tempRaw) ? NaN : tempRaw;

          // Mantengo il tuo filtro: scarta valori assurdi sopra 43
          if (!Number.isNaN(temp) && temp < 43) {
            minTemperature = Math.min(minTemperature, temp);
            maxTemperature = Math.max(maxTemperature, temp);
            tempSum += temp;
            tempCount++;
          }

          const urRaw = parseFloat(row[urField]);
          const ur = Number.isNaN(urRaw) ? NaN : urRaw;

          // NON usare "|| 0": se manca il dato non deve falsare min/max
          if (!Number.isNaN(ur)) {
            minUr = Math.min(minUr, ur);
            maxUr = Math.max(maxUr, ur);
          }
        }

        const annualTempMin = minTemperature !== Infinity ? minTemperature.toFixed(1) : null;
        const annualTempMax = maxTemperature !== -Infinity ? maxTemperature.toFixed(1) : null;
        const annualTempAvg = tempCount ? (tempSum / tempCount).toFixed(1) : null;

        const annualUrMin = minUr !== Infinity ? minUr.toFixed(0) : null;
        const annualUrMax = maxUr !== -Infinity ? maxUr.toFixed(0) : null;

        const annualRain =
          this.csvDataAnno?.length
            ? (this.csvDataAnno[this.csvDataAnno.length - 1][rainField] ?? null)
            : null;

        this.arrResponseAnno.push({
          anno: this.today.getFullYear().toString(),
          tempMin: annualTempMin,
          tempMax: annualTempMax,
          tempMedia: annualTempAvg,
          umiditaMax: annualUrMax,
          umiditaMin: annualUrMin,
          pioggia: annualRain
        });
        this.arrResponseAnno.push({
          anno: '2025',
          tempMin: '-4.3',
          tempMax: '34.5',
          tempMedia: '12.6',
          pioggia: '1589.5'
        });
        this.arrResponseAnno.push({
          anno: '2024',
          tempMin: '-2.5',
          tempMax: '36.4',
          tempMedia: '13.4',
          pioggia: '1467.6'
        });
        this.arrResponseAnno.push({
          anno: '2023',
          tempMin: '-3.3',
          tempMax: '36.9',
          tempMedia: '12.9',
          pioggia: '1717.4'
        });


        this.dataSourceAnno.data = this.arrResponseAnno;

        this.imageLoaderAnno = false;
        this.isVisibleAnno = true;
        this.utilityService.scrollToSpecifyPosition();
      },
      error: () => {
        // anno non trovato => mostra tabella vuota ma non rompere UI
        this.arrResponseAnno = [];
        this.dataSourceAnno.data = [];

        this.imageLoaderAnno = false;
        this.isVisibleAnno = true;
        this.utilityService.scrollToSpecifyPosition();
      }
    });
  }


  // Carica i dati dal CSV (MESE) - versione corretta e stabile (niente casino col paginator)
  loadCSVMeseData(): void {
    this.imageLoader = true;
    this.isVisible = false;

    // reset (evita accumuli)
    this.arrResponse = [];
    this.dataSource.data = [];

    // normalizza mese/anno dal dateControl (così non sballa quando vai indietro)
    const selected: Date = (this.dateControl?.value ?? new Date()) as Date;
    this.year = selected.getFullYear();
    this.month = (selected.getMonth() + 1).toString().padStart(2, '0');
    this.yearMonth = this.year;

    this.csvUrlMese = `assets/storico-cicerone/cicerone-${this.year}${this.month}.csv`;

    // Aggregati giornalieri
    const daily: {
      [dayKey: string]: {
        giorno: string;
        tempMin: number;
        tempMax: number;
        tempSum: number;
        tempCount: number;
        urMin: number;
        urMax: number;
        // Qui salvo il "cumulato" max del giorno (dal CSV), poi lo trasformo in differenza tra giorni
        rainCumMax: number;
      };
    } = {};

    // WARNING: il tuo campo sembra "Pioggia Cumulata". Per la pioggia del singolo giorno
    // facciamo la differenza tra cumulati giornalieri (ordinati per data).
    const rainField = 'Valle del Rio - Pioggia Cumulata - 51438 (mm)';
    const urField = 'Valle del Rio - Umidità Relativa - 51437 (%)';
    const tempField = 'Valle del Rio - Temperatura Aria - 51436 (°C)';

    this.fileService.getCSV(this.csvUrlMese).subscribe({
      next: (csvText) => {
        // parse col separatore corretto
        this.csvDataMese = this.fileService.parseCSV(csvText, ';');

        for (const row of this.csvDataMese) {
          const dateObj = new Date(row.Orario);
          if (Number.isNaN(dateObj.getTime())) {
            continue;
          }

          // questo check è opzionale (il file è già del mese), ma lo lasciamo safe
          if (dateObj.getFullYear() !== this.year || dateObj.getMonth() !== selected.getMonth()) {
            continue;
          }

          const dayKey = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj
            .getDate()
            .toString()
            .padStart(2, '0')}`;

          const dayLabel = dateObj.getDate().toString().padStart(2, '0');

          const tempRaw = parseFloat(row[tempField]);
          const temp = Number.isNaN(tempRaw) ? NaN : tempRaw;

          const urRaw = parseFloat(row[urField]);
          const ur = Number.isNaN(urRaw) ? NaN : urRaw;

          const rainCumRaw = parseFloat(row[rainField]);
          const rainCum = Number.isNaN(rainCumRaw) ? 0 : rainCumRaw;

          if (!daily[dayKey]) {
            daily[dayKey] = {
              giorno: dayLabel,
              tempMin: Number.isNaN(temp) ? Infinity : temp,
              tempMax: Number.isNaN(temp) ? -Infinity : temp,
              tempSum: Number.isNaN(temp) ? 0 : temp,
              tempCount: Number.isNaN(temp) ? 0 : 1,
              urMin: Number.isNaN(ur) ? Infinity : ur,
              urMax: Number.isNaN(ur) ? -Infinity : ur,
              rainCumMax: rainCum
            };
          } else {
            // Temperature: evita il bug "if(temp)" (0 o negativi vengono scartati!)
            // E mantieni il tuo filtro "temp < 43" ma in modo corretto
            if (!Number.isNaN(temp) && temp < 43) {
              daily[dayKey].tempMin = Math.min(daily[dayKey].tempMin, temp);
              daily[dayKey].tempMax = Math.max(daily[dayKey].tempMax, temp);
              daily[dayKey].tempSum += temp;
              daily[dayKey].tempCount++;
            }

            // Umidità: evita "if(ur)" (0 viene scartato)
            if (!Number.isNaN(ur)) {
              daily[dayKey].urMin = Math.min(daily[dayKey].urMin, ur);
              daily[dayKey].urMax = Math.max(daily[dayKey].urMax, ur);
            }

            // Pioggia cumulata: prendiamo il massimo del cumulato nel giorno
            daily[dayKey].rainCumMax = Math.max(daily[dayKey].rainCumMax, rainCum);
          }
        }

        // Costruisci array ORDINATO per giorno (fondamentale per pioggia differenza e per "indietro" coerente)
        const daysSorted = Object.keys(daily).sort();

        let prevCum = 0;
        const result = daysSorted.map((k, idx) => {
          const d = daily[k];

          const dayRain = idx === 0 ? d.rainCumMax : Math.max(0, d.rainCumMax - prevCum);
          prevCum = d.rainCumMax;

          const tMin = d.tempMin !== Infinity ? d.tempMin : null;
          const tMax = d.tempMax !== -Infinity ? d.tempMax : null;
          const tAvg = d.tempCount ? (d.tempSum / d.tempCount) : null;

          const urMin = d.urMin !== Infinity ? d.urMin : null;
          const urMax = d.urMax !== -Infinity ? d.urMax : null;

          return {
            giorno: d.giorno,
            tempMin: tMin !== null ? tMin.toFixed(1) : null,
            tempMax: tMax !== null ? tMax.toFixed(1) : null,
            tempMedia: tAvg !== null ? tAvg.toFixed(1) : null,
            umiditaMax: urMax !== null ? urMax.toFixed(0) : null,
            umiditaMin: urMin !== null ? urMin.toFixed(0) : null,
            pioggia: dayRain.toFixed(1),
            // cumulata mese = ultimo cumulato disponibile nel mese
            pioggiaMese: daysSorted.length ? daily[daysSorted[daysSorted.length - 1]].rainCumMax.toFixed(1) : null
          };
        });

        // Riepilogo mensile (usa filtri NaN-safe)
        const nums = (v: any) => {
          const n = parseFloat(v);
          return Number.isNaN(n) ? null : n;
        };

        const validTempMin = result.map(r => nums(r.tempMin)).filter(v => v !== null) as number[];
        const validTempMax = result.map(r => nums(r.tempMax)).filter(v => v !== null) as number[];
        const validTempAvg = result.map(r => nums(r.tempMedia)).filter(v => v !== null) as number[];
        const validUrMin = result.map(r => nums(r.umiditaMin)).filter(v => v !== null) as number[];
        const validUrMax = result.map(r => nums(r.umiditaMax)).filter(v => v !== null) as number[];

        const tempMinEstrema = validTempMin.length ? Math.min(...validTempMin) : null;
        const tempMaxEstrema = validTempMax.length ? Math.max(...validTempMax) : null;
        const tempMediaTot = validTempAvg.length ? (validTempAvg.reduce((a, b) => a + b, 0) / validTempAvg.length) : null;

        const umiditaEstremaMin = validUrMin.length ? Math.min(...validUrMin) : null;
        const umiditaEstremaMax = validUrMax.length ? Math.max(...validUrMax) : null;

        const lastPioggiaMese = result.length ? result[result.length - 1].pioggiaMese : null;

        result.push({
          giorno: 'Mensile',
          tempMin: tempMinEstrema !== null ? tempMinEstrema.toFixed(1) : '-',
          tempMax: tempMaxEstrema !== null ? tempMaxEstrema.toFixed(1) : '-',
          tempMedia: tempMediaTot !== null ? tempMediaTot.toFixed(1) : '-',
          umiditaMax: umiditaEstremaMax !== null ? umiditaEstremaMax.toFixed(0) : '-',
          umiditaMin: umiditaEstremaMin !== null ? umiditaEstremaMin.toFixed(0) : '-',
          pioggia: lastPioggiaMese !== null ? parseFloat(lastPioggiaMese).toFixed(1) : '0.0',
          pioggiaMese: lastPioggiaMese !== null ? parseFloat(lastPioggiaMese).toFixed(1) : '0.0'
        });


        this.arrResponse = result;
        this.dataSource.data = this.arrResponse;

        // ===== Paginator: NON fare più length=0/400 o pageSize variabile =====
        // Se vuoi usare il paginator come "mese avanti/indietro", mettilo con:
        // length=3 pageSize=1 pageIndex=1 e reset a centro nel handler.
        // Qui ci limitiamo a tenere currentPage coerente con mese (0..11) se ti serve per UI.
        this.currentPage = selected.getMonth();

        // sort (se usi due sort, metti reference; qui assumo sortMese corretto)
        if (this.sortMese) {
          this.dataSource.sort = this.sortMese;
        }

        this.imageLoader = false;
        this.isVisible = true;
        this.utilityService.scrollToSpecifyPosition();
      },
      error: () => {
        // File mese non trovato: mostra comunque tabella vuota, NON sballare paginator
        this.arrResponse = [];
        this.dataSource.data = [];

        this.currentPage = selected.getMonth();

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
    if (!onlyYear) {
      this.loadCSVMeseData();
    }
    /*if (this.year !== this.precYear) {
      this.arrResponseAnno = [];
      this.loadCSVAnnoData();
    }*/
    this.precYear = this.year;
  }

  handleMonthPager(e: PageEvent) {
    // previousPageIndex può essere undefined (primo evento)
    const prev = (e.previousPageIndex ?? 1);

    // se rimani al centro (1) non fare nulla
    if (e.pageIndex === 1) {
      return;
    }

    // se vai a 0 -> indietro, se vai a 2 -> avanti
    const delta = e.pageIndex < prev ? -1 : +1;

    const cur = (this.dateControl?.value ?? new Date()) as Date;
    const next = new Date(cur.getFullYear(), cur.getMonth() + delta, 1);

    // aggiorna stato
    this.dateControl.setValue(next);
    this.year = next.getFullYear();
    this.month = (next.getMonth() + 1).toString().padStart(2, '0');
    this.yearMonth = this.year;

    // ricarica mese
    this.loadCSVMeseData();

    // se cambia anno, ricarica annuale
    /*if (this.precYear !== this.year) {
      this.precYear = this.year;
      this.loadCSVAnnoData();
    }*/

    // reset paginator al centro (mai grigio)
    queueMicrotask(() => {
      this.paginator.pageIndex = 1;

      // refresh UI senza usare _changePageSize (più stabile)
      // In molte versioni basta questo; se noti che non si aggiorna, vedi nota sotto.
    });
  }

  handleYearPage(e: PageEvent) {
    this.currentYearIndex = e.pageIndex;

    const year = this.startYear + this.currentYearIndex;
    const cur = (this.dateControl?.value ?? new Date()) as Date;

    const selectedDate = new Date(year, cur.getMonth(), 1);

    // sincronizza lo stato
    this.dateControl.setValue(selectedDate);
    this.year = year;
    this.month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    this.yearMonth = this.year;

    // IMPORTANT: reset precYear e ricarica sempre l'annuale
    this.precYear = this.year;
    //this.loadCSVAnnoData();

    // opzionale: se vuoi anche il mese coerente col nuovo anno
    this.loadCSVMeseData();
  }
}
