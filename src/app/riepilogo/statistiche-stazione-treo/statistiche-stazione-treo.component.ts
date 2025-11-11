import {AfterViewInit, Component, OnInit, Output, Renderer2, ViewChild, EventEmitter} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormControl} from '@angular/forms';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {HttpClient} from '@angular/common/http';
import {StatisticheStazioneTreoInterface} from './statistiche-stazione-treo.interface';
import {FileService} from '../../service/file.service';

@Component({
  selector: 'statistiche-stazione-treo',
  templateUrl: './statistiche-stazione-treo.component.html',
  styleUrls: ['./statistiche-stazione-treo.component.css']
})
export class StatisticheStazioneTreoComponent implements OnInit, AfterViewInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  imageLoader = true;
  imageLoaderAnno = true;
  arrResponse: StatisticheStazioneTreoInterface[] = [];
  arrResponseAnno: StatisticheStazioneTreoInterface[] = [];
  displayedColumns: string[] = ['giorno', 'tempMin', 'tempMax', 'tempMedia', 'vento', 'pressione', 'umidita', 'pioggia'];
  displayedColumnsAnno: string[] = ['tempMin', 'tempMax', 'tempMedia', 'vento', 'pressione', 'pioggiaGiornalieraMax', 'pioggia'];
  dataSource = new MatTableDataSource<StatisticheStazioneTreoInterface>(this.arrResponse);
  dataSourceAnno = new MatTableDataSource<StatisticheStazioneTreoInterface>(this.arrResponseAnno);
  isVisible = false;
  isVisibleAnno = false;

  @ViewChild('paginatorMensile') paginator: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild('paginatorAnnuale') paginatorAnno: MatPaginator;

  @ViewChild(MatSort) set matSortAnno(sort: MatSort) {
    if (!this.dataSourceAnno.sort) {
      this.dataSourceAnno.sort = sort;
    }
  }

  paginatorLengthMensile = 400;
  paginatorLengthAnnuale = 9999;

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
  @Output() dataLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    this.year = this.today.getFullYear();
    this.yearMonth = this.year;
    this.month = (this.today.getMonth() + 1).toString();
    this.currentPage = this.today.getMonth();
    if (Number(this.month) <= 9) {
      this.month = '0' + this.month.toString();
    }
    this.loadCumulusDayFileData(false);
    this.loadCumulusDayFileData(true);
    this.precYear = this.year;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceAnno.paginator = this.paginatorAnno;
  }

  loadCumulusDayFileData(isAnnual?: boolean): void {
    // Spinner dedicato
    if (isAnnual) {
      this.imageLoaderAnno = true;
      this.isVisibleAnno = false;
    } else {
      this.imageLoader = true;
      this.isVisible = false;
    }

    const dayfileUrl = 'assets/storico-treo/dayfile.txt';
    const monthNum = Number(this.month);
    const yearShort = this.year % 100;

    const dailyData: Record<string, any> = {};

    this.http.get(dayfileUrl, { responseType: 'text' }).subscribe({
      next: (res) => {
        const righe = res.trim().split('\n');

        righe.forEach((riga) => {
          const c = riga.split(',');
          if (c.length < 25) return;

          const [giorno, mese, anno] = c[0].split('/').map(Number);
          if (anno !== yearShort) return;
          if (!isAnnual && mese !== monthNum) return;

          const tempMin = parseFloat(c[4]) || 0;
          const tempMax = parseFloat(c[6]) || 0;
          const pressioneMin = parseFloat(c[8]) || 0;
          const pressioneMax = parseFloat(c[10]) || 0;
          const pioggia = parseFloat(c[12]) || 0;
          const tempMedia = parseFloat(c[15]) || ((tempMin + tempMax) / 2);
          const umiditaMin = parseFloat(c[18]) || 0;
          const umiditaMax = parseFloat(c[20]) || 0;
          const ventoMax = parseFloat(c[22]) || 0;

          if (isAnnual) {
            if (!dailyData['annuale']) {
              dailyData['annuale'] = {
                giorno: 'Annuale',
                tempMin,
                tempMax,
                tempMedia,
                ventoMax,
                pressioneMin,
                pressioneMax,
                umiditaMin,
                umiditaMax,
                pioggiaMaxEvento: pioggia,
                pioggia,
                count: 1,
              };
            } else {
              const d = dailyData['annuale'];
              d.tempMin = Math.min(d.tempMin, tempMin);
              d.tempMax = Math.max(d.tempMax, tempMax);
              d.ventoMax = Math.max(d.ventoMax, ventoMax);
              d.pressioneMin = Math.min(d.pressioneMin, pressioneMin);
              d.pressioneMax = Math.max(d.pressioneMax, pressioneMax);
              d.umiditaMin = Math.min(d.umiditaMin, umiditaMin);
              d.umiditaMax = Math.max(d.umiditaMax, umiditaMax);
              d.pioggia += pioggia;
              d.pioggiaMaxEvento = Math.max(d.pioggiaMaxEvento, pioggia);
              d.tempMedia += tempMedia;
              d.count++;
            }
          } else {
            const key = `${anno}-${mese}-${giorno}`;
            if (!dailyData[key]) {
              dailyData[key] = {
                giorno: giorno.toString().padStart(2, '0'),
                tempMin,
                tempMax,
                tempMedia,
                ventoMax,
                pressioneMin,
                pressioneMax,
                umiditaMin,
                umiditaMax,
                pioggiaMaxEvento: pioggia,
                pioggia,
                count: 1,
              };
            } else {
              const d = dailyData[key];
              d.tempMin = Math.min(d.tempMin, tempMin);
              d.tempMax = Math.max(d.tempMax, tempMax);
              d.ventoMax = Math.max(d.ventoMax, ventoMax);
              d.pressioneMin = Math.min(d.pressioneMin, pressioneMin);
              d.pressioneMax = Math.max(d.pressioneMax, pressioneMax);
              d.umiditaMin = Math.min(d.umiditaMin, umiditaMin);
              d.umiditaMax = Math.max(d.umiditaMax, umiditaMax);
              d.pioggia += pioggia;
              d.pioggiaMaxEvento = Math.max(d.pioggiaMaxEvento, pioggia);
              d.tempMedia += tempMedia;
              d.count++;
            }
          }
        });

        let result: StatisticheStazioneTreoInterface[] = [];

        // 🧩 Nessun dato trovato
        if (isAnnual && !dailyData['annuale']) {
          console.warn(`Nessun dato per l'anno ${this.year}`);

          // Mostra una tabella "vuota" con messaggio descrittivo
          this.arrResponseAnno = [
            {
              giorno: `Nessun dato per ${this.year}`,
              tempMin: '-',
              tempMax: '-',
              tempMedia: '-',
              ventoMax: '-',
              pressioneMin: '-',
              pressioneMax: '-',
              umiditaMin: '-',
              umiditaMax: '-',
              pioggiaMaxEvento: '-',
              pioggia: '-',
            },
          ];

          this.dataSourceAnno.data = this.arrResponseAnno;
          this.imageLoaderAnno = false;
          this.isVisibleAnno = true;
          return;
        }

        if (!isAnnual && Object.keys(dailyData).length === 0) {
          console.warn(`Nessun dato per ${this.month}/${this.year}`);

          this.arrResponse = [
            {
              giorno: `Nessun dato per ${this.getMonthName(this.month)} ${this.year}`,
              tempMin: '-',
              tempMax: '-',
              tempMedia: '-',
              ventoMax: '-',
              pressioneMin: '-',
              pressioneMax: '-',
              umiditaMin: '-',
              umiditaMax: '-',
              pioggiaMaxEvento: '-',
              pioggia: '-',
            },
          ];

          this.dataSource.data = this.arrResponse;
          this.imageLoader = false;
          this.isVisible = true;
          return;
        }

        // 🧮 Riepilogo annuale singolo
        if (isAnnual) {
          const a = dailyData['annuale'];
          result = [
            {
              giorno: 'Annuale',
              tempMin: a.tempMin.toFixed(1),
              tempMax: a.tempMax.toFixed(1),
              tempMedia: (a.tempMedia / a.count).toFixed(1),
              ventoMax: a.ventoMax.toFixed(1),
              pressioneMin: a.pressioneMin.toFixed(1),
              pressioneMax: a.pressioneMax.toFixed(1),
              umiditaMin: a.umiditaMin.toFixed(0),
              umiditaMax: a.umiditaMax.toFixed(0),
              pioggiaMaxEvento: a.pioggiaMaxEvento.toFixed(1),
              pioggia: a.pioggia.toFixed(1),
            },
          ];
        } else {
          // 🧮 Tutti i giorni + riepilogo mensile
          result = Object.values(dailyData)
            .sort((a, b) => Number(a.giorno) - Number(b.giorno))
            .map((d) => ({
              giorno: d.giorno,
              tempMin: d.tempMin.toFixed(1),
              tempMax: d.tempMax.toFixed(1),
              tempMedia: (d.tempMedia / d.count).toFixed(1),
              ventoMax: d.ventoMax.toFixed(1),
              pressioneMin: d.pressioneMin.toFixed(1),
              pressioneMax: d.pressioneMax.toFixed(1),
              umiditaMin: d.umiditaMin.toFixed(0),
              umiditaMax: d.umiditaMax.toFixed(0),
              pioggiaMaxEvento: d.pioggiaMaxEvento.toFixed(1),
              pioggia: d.pioggia.toFixed(1),
            }));

          if (result.length > 0) {
            const tempMinEstrema = Math.min(...result.map((d) => parseFloat(d.tempMin)));
            const tempMaxEstrema = Math.max(...result.map((d) => parseFloat(d.tempMax)));
            const tempMediaTot = result.reduce((acc, d) => acc + parseFloat(d.tempMedia), 0) / result.length;
            const ventoMaxEstremo = Math.max(...result.map((d) => parseFloat(d.ventoMax)));
            const pressioneMinEstrema = Math.min(...result.map((d) => parseFloat(d.pressioneMin)));
            const pressioneMaxEstrema = Math.max(...result.map((d) => parseFloat(d.pressioneMax)));
            const pioggiaTotale = result.reduce((acc, d) => acc + parseFloat(d.pioggia), 0);
            const pioggiaGiornalieraMax = Math.max(...result.map((d) => parseFloat(d.pioggiaMaxEvento)));

            result.push({
              giorno: 'Mensile',
              tempMin: tempMinEstrema.toFixed(1),
              tempMax: tempMaxEstrema.toFixed(1),
              tempMedia: tempMediaTot.toFixed(1),
              ventoMax: ventoMaxEstremo.toFixed(1),
              pressioneMin: pressioneMinEstrema.toFixed(1),
              pressioneMax: pressioneMaxEstrema.toFixed(1),
              umiditaMin: '-',
              umiditaMax: '-',
              pioggiaMaxEvento: pioggiaGiornalieraMax.toFixed(1),
              pioggia: pioggiaTotale.toFixed(1),
            });
          }
        }

        // ✅ Aggiorna tabella corretta
        if (isAnnual) {
          this.arrResponseAnno = result;
          this.dataSourceAnno.data = result;
          this.imageLoaderAnno = false;
          this.dataLoaded.emit(true);
          this.isVisibleAnno = true;
        } else {
          this.arrResponse = result;
          this.dataSource.data = result;
          this.imageLoader = false;
          this.dataLoaded.emit(true);
          this.isVisible = true;
        }
      },
      error: (err) => {
        console.error('Errore caricamento dayfile.txt:', err);
        this.imageLoader = false;
        this.imageLoaderAnno = false;
        this.dataLoaded.emit(true);
      },
    });
  }

  filterData(selectedDate = this.dateControl.value, onlyYear?: boolean) {
    if (!selectedDate) return;

    this.month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    this.year = selectedDate.getFullYear();

    // Carica solo il mese (sempre)
    if (!onlyYear) {
      this.loadCumulusDayFileData(false);
    }

    // ✅ Carica riepilogo annuale solo se l'anno è diverso da quello già caricato
    if (this.year !== this.precYear || !this.arrResponseAnno.length) {
      this.arrResponseAnno = [];
      this.loadCumulusDayFileData(true);
    }

    this.precYear = this.year;
  }




  public handlePage(e: PageEvent) {
    // Calcola il mese corrente (0–11)
    let currentMonth = this.dateControl.value.getMonth();
    let currentYear = this.year;

    // ▶️ Freccia destra → mese successivo
    if (e.pageIndex > e.previousPageIndex) {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }

    // ◀️ Freccia sinistra → mese precedente
    if (e.pageIndex < e.previousPageIndex) {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
    }

    // Aggiorna i valori del componente
    this.year = currentYear;
    this.month = (currentMonth + 1).toString().padStart(2, '0');
    this.currentPage = currentMonth;

    // Aggiorna il datepicker senza ri-triggerare eventi
    const selectedDate = new Date(currentYear, currentMonth, 1);
    this.dateControl.setValue(selectedDate, { emitEvent: false });

    console.log(`📅 Cambio mese → ${this.month}/${this.year}`);

    // Mostra spinner e resetta visibilità
    this.imageLoader = true;
    this.isVisible = false;

    // Attendi leggermente e ricarica solo i dati mensili
    setTimeout(() => {
      this.loadCumulusDayFileData(false);
    }, 100);
  }



  // 📆 Navigazione tra gli anni (paginator annuale)
  public handlePageAnno(e: PageEvent) {
    // Calcola direzione
    const goingForward = e.pageIndex > this.currentPageAnno;
    const goingBackward = e.pageIndex < this.currentPageAnno;

    // Limiti disponibili (2013–2025)
    const MIN_YEAR = 2024;
    const MAX_YEAR = 2050;

    if (goingForward && this.year < MAX_YEAR) this.year++;
    else if (goingBackward && this.year > MIN_YEAR) this.year--;
    else return; // fuori range → non fa nulla

    this.currentPageAnno = e.pageIndex;

    // Aggiorna data mantenendo il mese attuale
    const selectedDate = new Date(this.year, this.dateControl.value.getMonth());
    this.dateControl.setValue(selectedDate, { emitEvent: false });

    // Mostra spinner annuale
    this.imageLoaderAnno = true;
    this.isVisibleAnno = false;

    // Carica solo i dati annuali
    setTimeout(() => {
      this.loadCumulusDayFileData(true);
    }, 100);
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
}
