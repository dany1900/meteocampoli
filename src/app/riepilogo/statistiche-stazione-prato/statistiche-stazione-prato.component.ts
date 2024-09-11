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
  arrResponse: StatisticheStazioneInterface[] = [];
  displayedColumns: string[] = ['giorno', 'tempMin', 'tempMax', 'tempMedia', 'vento', 'umidita', 'pioggia'];
  dataSource = new MatTableDataSource<StatisticheStazioneInterface>(this.arrResponse);
  isVisible = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  public pageSize;
  public currentPage;
  public totalSize;
  pageEvent: PageEvent;

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

  csvData: any[] = [];  // I dati CSV caricati
  csvDataMonthly: any[] = [];  // I dati CSV caricati ordinati
  month: string;
  year: number;
  today: Date;
  dateControl = new FormControl(new Date());  // Imposta la data odierna
  csvUrl: string;  // URL del file CSV

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
    this.month = (this.today.getMonth() + 1).toString();
    this.currentPage = this.today.getMonth();
    if (Number(this.month) <= 9) {
      this.month = '0' + this.month.toString();
    }
    this.loadCSVData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Carica i dati dal CSV
  loadCSVData(): void {
    this.imageLoader = true;
    //this.csvUrl = 'assets/storico-prato/' + this.year + '/' + this.month + '/username.csv';
    //this.csvUrl = 'assets/' + this.year + this.month + 'A.CSV';
    this.csvUrl = 'assets/storico-prato/' + this.year + this.month + '.csv';

    const dailyTemperatures: { [key: string]: { giorno, tempMin, tempMax, tempMedia, vento, umidita, pioggia, pioggiaMese, tempCount } } = {};

    // Ottenere e parsare il CSV al caricamento del componente
    this.fileService.getCSV(this.csvUrl).subscribe(
      (data: string) => {
        this.csvData = this.fileService.parseCSV(data, ',');
        this.csvData.map((csv => {
          // Estrai solo la parte della data (senza l'ora)
          const dateObj = new Date(csv.ora);
          const day = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
          const rain = parseFloat(csv['Pioggia dell\'evento(mm)']) || 0;  // Se non ci sono dati di pioggia, usa 0
          const rainMese = parseFloat(csv['Pioggia mensile(mm)']) || 0;  // Se non ci sono dati di pioggia, usa 0
          const wind = parseFloat(csv['Raffica(km/h)']) || 0;  // Se non ci sono dati di vento, usa 0
          const windMese = parseFloat(csv['Raffica(km/h)']) || 0;  // Se non ci sono dati di vento, usa 0
          const ur = parseFloat(csv['Umidità esterna(%)']) || 0;  // Se non ci sono dati di vento, usa 0

          if (dateObj.getMonth() + 1 === this.dateControl.value.getMonth() + 1) {
            if (!dailyTemperatures[day]) {
              dailyTemperatures[day] = {
                giorno: dateObj.getDate().toString().padStart(2, '0'),
                tempMin: csv['Temperatura esterna(℃)'],
                tempMax: csv['Temperatura esterna(℃)'],
                tempMedia: parseFloat(csv['Temperatura esterna(℃)']),
                vento: wind,
                umidita: ur,
                pioggia: rain,
                pioggiaMese: rainMese,
                tempCount: 1
              };
            } else {
              // Aggiorna la temperatura minima e massima
              dailyTemperatures[day].tempMin = Math.min(dailyTemperatures[day].tempMin, csv['Temperatura esterna(℃)']);
              dailyTemperatures[day].tempMax = Math.max(dailyTemperatures[day].tempMax, csv['Temperatura esterna(℃)']);
              // Somma la pioggia totale del giorno
              //dailyTemperatures[day].pioggiaMese = rainMese;

              // Raffica massima del vento
              dailyTemperatures[day].vento = Math.max(dailyTemperatures[day].vento, wind);

              // umidita
              dailyTemperatures[day].umidita = Math.max(dailyTemperatures[day].umidita, ur);

              // Aggiorna la somma e il conteggio delle temperature per calcolare la media
              dailyTemperatures[day].tempMedia += parseFloat(csv['Temperatura esterna(℃)']);
              dailyTemperatures[day].tempCount += 1;
            }
          }
        }));

        let result: StatisticheStazioneInterface[];

        // Trasforma l'oggetto in un array se necessario

        result = Object.keys(dailyTemperatures).map(day => (
          {
            giorno: dailyTemperatures[day].giorno,
            tempMin: dailyTemperatures[day].tempMin,
            tempMax: dailyTemperatures[day].tempMax,
            tempMedia: (dailyTemperatures[day].tempMedia / dailyTemperatures[day].tempCount).toFixed(1),
            ventoMax: dailyTemperatures[day].vento,
            umidita: dailyTemperatures[day].umidita,
            pioggia: dailyTemperatures[day].pioggia,
            pioggiaMese: dailyTemperatures[day].pioggiaMese
          }));

        const tempMinEstrema = Math.min(...result.map(dato => dato.tempMin ? parseFloat(dato.tempMin) : null));
        const tempMaxEstrema = Math.max(...result.map(dato => dato.tempMax ? parseFloat(dato.tempMax) : null));
        const tempMediaTot = result.reduce((acc, dato) => dato.tempMedia ? acc + parseFloat(dato.tempMedia) : null, 0) / result.length;
        const ventoMaxEstremo = Math.max(...result.map(dato => dato.ventoMax ? parseFloat(dato.ventoMax) : null));
        const umiditaMaxEstrema = Math.max(...result.map(dato => dato.umidita ? parseFloat(dato.umidita) : null));

        result.push({
          giorno: 'Totale',
          tempMin: tempMinEstrema.toString(),
          tempMax: tempMaxEstrema.toString(),
          tempMedia: tempMediaTot.toFixed(1).toString(),
          ventoMax: ventoMaxEstremo.toString(),
          umidita: umiditaMaxEstrema.toString(),
          pioggia:  result.length ? result[result.length - 1].pioggiaMese : null
        });

        this.dataSource.data = result;
        this.dataSource.data.length = result.length;
        if (this.dateControl.value.getMonth() === 1) {
          this.currentPage = 1;
        } else {
          this.currentPage = this.dateControl.value.getMonth() - 1;
        }
        if (this.paginator) {
          if (this.dateControl && this.dateControl.value.getMonth() < (this.today.getMonth())) {
            this.paginator.length = 400;
          } else {
            this.paginator.length = 0;
          }
        }
        this.dataSource.sort = this.matSort;
        this.utilityService.scrollToSpecifyPosition();
        this.imageLoader = false;
        this.isVisible = true;
      },
      (error) => {
        this.currentPage = this.dateControl.value.getMonth() - 1;
        if (this.currentPage === 0) {
          this.currentPage = 1;
        }
        this.dataSource.data.length = 1;
        this.dataSource.data = [];
        this.paginator.length = 400;
        this.imageLoader = false;
        this.utilityService.scrollToSpecifyPosition();
      }
    );
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
    const midValue = 60;   // Valore intermedio (inizio transizione verso rosso)
    const maxValue = 150;  // Valore massimo (rosso)

    if (value <= minValue) {
      return 'rgb(255, 255, 255)'; // Bianco
    } else if (value >= maxValue) {
      return 'rgb(255, 0, 0)'; // Rosso
    } else if (value <= midValue) {
      // Transizione da bianco a grigio
      const normalizedValue = (value - minValue) / (midValue - minValue);
      const gray = Math.floor(255 * (1 - normalizedValue) + 70); // Dal bianco (255) al grigio (0)

      return `rgb(${gray}, ${gray}, ${gray})`; // Colore da bianco a grigio
    } else {
      // Transizione da grigio a rosso
      const normalizedValue = (value - midValue) / (maxValue - midValue);
      const red = Math.floor(255 * normalizedValue);  // Aumenta il rosso da 0 a 255
      const gray = Math.floor(255 * (1 - normalizedValue)); // Diminuisce grigio da 255 a 0

      return `rgb(255, ${gray}, ${gray})`; // Da grigio a rosso
    }
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

  // Quando viene selezionato un mese
  chosenMonthHandler(normalizedMonth: Date, datepicker: any) {
    const ctrlValue = this.dateControl.value;
    ctrlValue.setMonth(normalizedMonth.getMonth());
    this.dateControl.setValue(ctrlValue);
    datepicker.close();  // Chiude il selettore
  }

  // Filtra i dati CSV per mese e anno
  filterData(selectedDate = this.dateControl.value) {
    if (!selectedDate) {
      return;
    }

    this.month = (selectedDate.getMonth() + 1).toString();  // I mesi vanno da 0 a 11
    if (Number(this.month) <= 9) {
      this.month = '0' + this.month.toString();
    }
    this.year = selectedDate.getFullYear();
    this.loadCSVData();
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
      }  else {
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
}
