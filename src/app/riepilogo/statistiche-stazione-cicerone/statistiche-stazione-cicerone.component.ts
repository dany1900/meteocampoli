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
  displayedColumnsAnno: string[] = ['tempMin', 'tempMax', 'tempMedia', 'pioggia'];
  dataSource = new MatTableDataSource<StatisticheStazioneInterface>(this.arrResponse);
  dataSourceAnno = new MatTableDataSource<StatisticheStazioneInterface>(this.arrResponseAnno);
  isVisible = false;
  isVisibleAnno = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator) paginatorAnno: MatPaginator;

  @ViewChild(MatSort) set matSortAnno(sort: MatSort) {
    if (!this.dataSourceAnno.sort) {
      this.dataSourceAnno.sort = sort;
    }
  }

  public pageSize;
  public currentPage;
  public pageSizeAnno;
  public currentPageAnno;
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
  today: Date;
  dateControl = new FormControl(new Date());  // Imposta la data odierna
  dateControlAnnuale = new FormControl(new Date());  // Imposta la data odierna
  csvUrlMese: string;  // URL del file CSV
  csvAnnoPath: string;  // URL del file CSV anno

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
    this.year = this.today.getFullYear();
    this.month = (this.today.getMonth() + 1).toString();
    this.currentPage = this.today.getMonth();
    if (Number(this.month) <= 9) {
      this.month = '0' + this.month.toString();
    }
    this.loadCSVMeseData();
    this.loadCSVAnnoData();
    //this.tabellaTerremoti();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceAnno.paginator = this.paginatorAnno;
  }

  /*tabellaTerremoti( startDate?: string, endDate?: string) {
    const url = 'https://temporeale.regione.lazio.it/datascapeA/v3/data-combo/51438?from=2024-01-01T00%3A00%3A00%2B01%3A00&to=2024-09-19T23%3A59%3A59%2B01%3A00&basicType=Plausible&part=EpochTime&part=ValueWithInvalid&timing=ReducedEquispaced&loadAlsoExtemp=true&ui_culture=it&reduction=60&_=1726774986980';
    const headers = new HttpHeaders();
    let queryParams = new HttpParams();
    headers.set('content-type', 'text/plain; charset=utf-8');
    headers.set('Authorization', 'Bearer CfDJ8DxULupjwt9CttBpgUW8nBw0ySGtuJwwCZJS_nGfk3Mlmfr4a3e3aqK6jnFKsu3o_suDbeKEE0e2sAy34ur2IdtzS_rrCcWCtlOYdSIMxO9xZCWYHMb-qN0EGpwvgvUqNZb3Mlwdjkey4fOhPX1EIv16_OVUcmX7pA3M6JSIIU-mAyR8UYCZZSOtM_xG1JpGT2qA_I43nVCV5mTe_83LGm7Ro3FRlB6nQQ-godjs9NApXAGO846gQjTPXPePQKhfpf97dXDa_UGOzz8qSKIFAILl13rApO8ThEjeYHnZWnFpZNCaiaxzEfMd1vZEn-OybkQWFkBWjdGkUXHG54yUB_AsxAdc5mdbAzByD6apF3hVY65y_pKh72RVXFsOX-ddPDuFFjhWJxVPIw-3hrPdG4vz8LmYqKc_bgF7jHJxKLq-tKQESzjBXHZSnbfEKg-LGfTrlm-Dk196CvdWCY7QuML4lQAAKCla8Fo_hmGy3FM7S05HNIBVnM3bT4OgW-0WeM8uFJccYC9kCRzx_3cdInlBRNepzNKeYj7ezcCBBxa22MevVcUrV_hnobEVVp91ZQwy_R69nJBAeGQivhbt8_dJgh1zcVwrzHu4OO288FVpxQa0ht9PR_DJ0niLI_3QCBHpsDPwDN6VratfeYNJ7ExPdt5wfN5cGNYKXPI5FWuyca4532t9rcpCW2HsehWmjw'):
    /!*queryParams = queryParams.append('starttime', dateMinus4Day);
    if (endDate) {
      queryParams = queryParams.append('endtime', endDate);
    }
    queryParams = queryParams.append('minmag', minMag);
    if (maxMag) {
      queryParams = queryParams.append('maxmag', maxMag);
    }
    queryParams = queryParams.append('orderby', 'time');
    queryParams = queryParams.append('format', 'text');
    queryParams = queryParams.append('lat', '41.44');
    queryParams = queryParams.append('lon', '13.41');
    queryParams = queryParams.append('includeallorigins', false);
    queryParams = queryParams.append('includeallmagnitudes', false);
    queryParams = queryParams.append('includeallstationsmagnitudes', false);
    queryParams = queryParams.append('includearrivals', false);*!/
    return this.http.get(url, {headers: headers, params: queryParams, responseType: 'text'}).subscribe(data => {
     let res = data;
    }, () => { this.isVisible = true; this.imageLoader = false; });
  }*/

  loadCSVAnnoData() {
    this.csvAnnoPath = 'assets/storico-cicerone/cicerone-' + this.year + '.csv';

    this.fileService.getCSV(this.csvAnnoPath).subscribe(res => {
      this.csvDataAnno = this.fileService.parseCSV(res, ';');
      let minTemperature = Infinity;
      let maxTemperature = -20;
      let avgTemperature = 0;
      let minUr = Infinity;
      let maxUr = 0;
      let tempCount = 1;
      this.csvDataAnno.forEach(anno => {
        const temp = parseFloat(anno['Valle del Rio - Temperatura Aria - 51436 (°C)']);
        const ur = parseFloat(anno['Valle del Rio - Umidità Relativa - 51437 (%)']) || 0;  // Se non ci sono dati di vento, usa 0

        if (!isNaN(temp) && temp < minTemperature) {
          minTemperature = temp;
        }
        if (!isNaN(temp) && temp > maxTemperature) {
          maxTemperature = temp;
        }
        if (!isNaN(temp)) {
          avgTemperature += temp;
          tempCount += 1;
        }
        if (!isNaN(ur) && ur < minUr) {
          minUr = ur;
        }
        if (!isNaN(ur) && ur > maxUr) {
          maxUr = ur;
        }
      });


      this.arrResponseAnno.push({
        giorno: 'Annuale',
        tempMin: minTemperature.toString(),
        tempMax: maxTemperature.toString(),
        tempMedia: (avgTemperature / tempCount).toFixed(1),
        umiditaMax: maxUr.toString(),
        umiditaMin: minUr.toString(),
        pioggia: this.csvDataAnno && this.csvDataAnno.length ? this.csvDataAnno[this.csvDataAnno.length - 1]['Valle del Rio - Pioggia Cumulata - 51438 (mm)'] : null
      });

      //const rainAnno = parseFloat(this.csvDataAnno[this.csvDataAnno.length - 1]['Pioggia annuale(mm)']) || 0;  // Se non ci sono dati di pioggia, usa 0


      this.dataSourceAnno.data = this.arrResponseAnno;
      this.dataSourceAnno.data.length = this.arrResponseAnno.length;
      this.imageLoaderAnno = false;
      this.isVisibleAnno = true;
      //const tempMinEstrema = Math.min(...this.csvDataAnno.map(dato => dato['Temperatura esterna(℃)'] ? parseFloat(dato['Temperatura esterna(℃)']) : null));
    });
  }


  // Carica i dati dal CSV
  loadCSVMeseData(): void {
    this.imageLoader = true;
    this.csvUrlMese = 'assets/storico-cicerone/cicerone-' + this.year + this.month + '.csv';

    const dailyTemperatures: { [key: string]: { giorno, tempMin, tempMax, tempMedia, umiditaMax, umiditaMin, pioggia, pioggiaMese, tempCount } } = {};
    // Ottenere e parsare il CSV al caricamento del componente
    forkJoin(
      this.fileService.getCSV(this.csvUrlMese),
    )
      .pipe(
        map(([csvMese]) => {
          return {
            csvMese: csvMese,
          };
        }),
      )
      .subscribe(async res => {
          this.csvDataMese = this.fileService.parseCSV(res.csvMese, ';');
          this.csvDataMese.map((csv => {
            let dayPrec;
            // Estrai solo la parte della data (senza l'ora)
            const dateObj = new Date(csv.Orario);
            const day = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
            const rain = parseFloat(csv['Valle del Rio - Pioggia Cumulata - 51438 (mm)']) || 0;  // Se non ci sono dati di pioggia, usa 0
            const rainMese = parseFloat(csv['Valle del Rio - Pioggia Cumulata - 51438 (mm)']) || 0;  // Se non ci sono dati di pioggia, usa 0
            const ur = parseFloat(csv['Valle del Rio - Umidità Relativa - 51437 (%)']) || null;  // Se non ci sono dati di vento, usa 0
            const temp = parseFloat(csv['Valle del Rio - Temperatura Aria - 51436 (°C)']) || null;  // Se non ci sono dati di vento, usa 0

            if (dateObj.getMonth() + 1 === this.dateControl.value.getMonth() + 1) {
              if (!dailyTemperatures[day]) {
                dailyTemperatures[day] = {
                  giorno: dateObj.getDate().toString().padStart(2, '0'),
                  tempMin: temp,
                  tempMax: temp,
                  tempMedia: temp,
                  umiditaMax: ur,
                  umiditaMin: ur,
                  pioggia: rain,
                  pioggiaMese: rainMese,
                  tempCount: 1
                };
              } else {
                // Aggiorna la temperatura minima e massima
                if (temp) {
                  dailyTemperatures[day].tempMin = Math.min(dailyTemperatures[day].tempMin, temp);
                  dailyTemperatures[day].tempMax = Math.max(dailyTemperatures[day].tempMax, temp);
                  // Aggiorna la somma e il conteggio delle temperature per calcolare la media
                  dailyTemperatures[day].tempMedia += temp;
                  dailyTemperatures[day].tempCount += 1;
                }
                // Somma la pioggia totale del giorno
                dailyTemperatures[day].pioggia = Math.max(dailyTemperatures[day].pioggia, rain);

                if (ur) {
                  // umidita
                  dailyTemperatures[day].umiditaMax = Math.max(dailyTemperatures[day].umiditaMax, ur);
                  // umidita
                  dailyTemperatures[day].umiditaMin = Math.min(dailyTemperatures[day].umiditaMin, ur);
                }
              }
            }
          }));


          // Trasforma l'oggetto in un array se necessario

          let previousRain = 0; // Variabile per memorizzare la pioggia del giorno precedente
          const result = Object.keys(dailyTemperatures).map((day, index) => {
            const currentRain = dailyTemperatures[day].pioggia;
            // Calcola la pioggia attuale meno quella del giorno precedente
            const pioggiaSottratta = index === 0 ? currentRain : currentRain - previousRain;
            // Aggiorna la variabile previousRain con il valore della pioggia attuale per il prossimo giorno
            previousRain = currentRain;
            return {
              giorno: dailyTemperatures[day].giorno,
              tempMin: dailyTemperatures[day].tempMin,
              tempMax: dailyTemperatures[day].tempMax,
              tempMedia: (dailyTemperatures[day].tempMedia / dailyTemperatures[day].tempCount).toFixed(1),
              umiditaMax: dailyTemperatures[day].umiditaMax,
              umiditaMin: dailyTemperatures[day].umiditaMin,
              pioggia: pioggiaSottratta.toFixed(1), // La pioggia con il valore del giorno precedente sottratto
              pioggiaMese: this.csvDataMese && this.csvDataMese.length ? this.csvDataMese[this.csvDataMese.length - 1]['Valle del Rio - Pioggia Cumulata - 51438 (mm)'] : null,
            };
          });

          const tempMinEstrema = Math.min(...result.map(dato => dato.tempMin ? parseFloat(dato.tempMin) : null));
          const tempMaxEstrema = Math.max(...result.map(dato => dato.tempMax ? parseFloat(dato.tempMax) : null));
          const tempMediaTot = result.reduce((acc, dato) => dato.tempMedia ? acc + parseFloat(dato.tempMedia) : null, 0) / result.length;
          const umiditaEstremaMax = Math.max(...result.map(dato => dato.umiditaMax ? parseFloat(dato.umiditaMax) : null));
          const umiditaEstremaMin = Math.min(...result.map(dato => dato.umiditaMin ? parseFloat(dato.umiditaMin) : null));

          this.arrResponse = result;

          result.push({
            pioggiaMese: undefined,
            giorno: 'Mensile',
            tempMin: tempMinEstrema.toString(),
            tempMax: tempMaxEstrema.toString(),
            tempMedia: tempMediaTot.toFixed(1).toString(),
            umiditaMax: umiditaEstremaMax.toString(),
            umiditaMin: umiditaEstremaMin.toString(),
            pioggia: result && result.length ? result[result.length - 1].pioggiaMese : null
          });

          this.arrResponse = result;


          this.dataSource.data = this.arrResponse;
          this.dataSource.data.length = this.arrResponse.length;
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
  filterData(selectedDate = this.dateControl.value) {
    if (!selectedDate) {
      return;
    }

    this.month = (selectedDate.getMonth() + 1).toString();  // I mesi vanno da 0 a 11
    if (Number(this.month) <= 9) {
      this.month = '0' + this.month.toString();
    }
    this.year = selectedDate.getFullYear();
    this.loadCSVMeseData();
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
    //this.filterData(this.dateControl.value);
  }
}
