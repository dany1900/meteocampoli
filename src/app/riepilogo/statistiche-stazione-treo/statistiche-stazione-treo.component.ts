import {AfterViewInit, Component, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
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

  public currentPage;
  public currentPageAnno = 1;
  public month: string;
  public year: number;
  public yearMonth: number;
  public today: Date;
  public precYear: number;
  public dateControl = new FormControl(new Date());
  @Output() dataLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  private cacheAnnuale: Record<number, StatisticheStazioneTreoInterface[]> = {};
  // 🔹 Cache annuale: conserva il riassunto già calcolato per ogni anno
  private cacheAnnualSummary: Record<number, StatisticheStazioneTreoInterface[]> = {};

  months: string[] = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  constructor(
    private seo: SEOService,
    protected router: Router,
    public utilityService: UtiliyService,
    private http: HttpClient,
    public renderer: Renderer2,
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    this.title = 'Statistiche Stazione Loc.Prato - Meteo Campoli';
    this.description = 'Riepilogo stazione meteo Campoli Appennino Località Prato. Tutte le statistiche giornaliere, mensili e annuali complete.';
    this.keywords = 'statistiche meteo campoli, stazione meteo prato campoli';
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
    this.month = (this.today.getMonth() + 1).toString().padStart(2, '0');
    this.currentPage = this.today.getMonth();
    this.precYear = this.year;
    this.loadCumulusDayFileData(); // carica mese+anno
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceAnno.paginator = this.paginatorAnno;
  }

  async loadCumulusDayFileData(): Promise<void> {
    const selectedDate = this.dateControl.value;
    this.year = selectedDate.getFullYear();
    const monthNum = selectedDate.getMonth() + 1;
    this.month = monthNum.toString().padStart(2, '0');

    // Spinner
    this.imageLoader = true;
    this.imageLoaderAnno = true;
    this.isVisible = false;
    this.isVisibleAnno = false;

    try {
      // --- Helper numerici ---
      const num = (a: number[]) => a.filter(v => typeof v === 'number' && !isNaN(v));
      const min = (a: number[]) => Math.min(...num(a));
      const max = (a: number[]) => Math.max(...num(a));
      const avg = (a: number[]) => {
        const vals = num(a);
        return vals.length ? vals.reduce((x, y) => x + y, 0) / vals.length : NaN;
      };
      const sum = (a: number[]) => num(a).reduce((x, y) => x + y, 0);

      // --- 1️⃣ Carica sorgenti ---
      let xmlData: any[] = [];
      let dayfileData: any[] = [];

      // Tutti gli anni fino al 2025-08 inclusi: XML
      if (this.year <= 2025) {
        const endMonthXml = this.year === 2025 ? 8 : 12;
        xmlData = await this.loadXmlAnnualRawData(this.year, 1, endMonthXml);
      }

      // Se anno >= 2025 → Cumulus
      if (this.year >= 2025) {
        const txt = await this.http.get('assets/storico-treo/dayfile.txt', { responseType: 'text' }).toPromise();
        const parsed = this.parseDayfile(txt, this.year);
        // Se è 2025 → prendi solo da settembre in poi
        dayfileData = this.year === 2025 ? parsed.filter(d => d.mese >= 9) : parsed;
      }

      // --- 2️⃣ Combina sorgenti ---
      const allData = [...xmlData, ...dayfileData];
      console.log(`📊 Dati combinati per ${this.year}: XML=${xmlData.length}, Cumulus=${dayfileData.length}`);

      // --- 3️⃣ Filtra per mese selezionato ---
      const datiMese = allData.filter(d => d.mese === monthNum);

      if (!datiMese.length) {
        this.arrResponse = [{
          giorno: `Nessun dato per ${this.getMonthName(this.month)} ${this.year}`,
          tempMin: '-', tempMax: '-', tempMedia: '-', ventoMax: '-',
          pressioneMin: '-', pressioneMax: '-', umiditaMin: '-', umiditaMax: '-',
          pioggiaMaxEvento: '-', pioggia: '-'
        }];
        this.dataSource.data = this.arrResponse;
        this.arrResponseAnno = [{
          giorno: `Anno ${this.year}`,
          tempMin: '-', tempMax: '-', tempMedia: '-', ventoMax: '-',
          pressioneMin: '-', pressioneMax: '-', umiditaMin: '-', umiditaMax: '-', pioggiaMaxEvento: '-', pioggia: '-'
        }];
        this.dataSourceAnno.data = this.arrResponseAnno;
        this.imageLoader = false;
        this.imageLoaderAnno = false;
        this.isVisible = this.isVisibleAnno = true;
        return;
      }

      // --- 4️⃣ Calcolo riepilogo mensile ---
      const giorni = [...datiMese].sort((a, b) => Number(a.giorno) - Number(b.giorno));
      giorni.push({
        giorno: 'Mensile',
        tempMin: min(datiMese.map(d => d.tempMin)),
        tempMax: max(datiMese.map(d => d.tempMax)),
        tempMedia: avg(datiMese.map(d => d.tempMedia)),
        ventoMax: max(datiMese.map(d => d.ventoMax)),
        pressioneMin: min(datiMese.map(d => d.pressioneMin)),
        pressioneMax: max(datiMese.map(d => d.pressioneMax)),
        umiditaMin: min(datiMese.map(d => d.umiditaMin)),
        umiditaMax: max(datiMese.map(d => d.umiditaMax)),
        pioggia: sum(datiMese.map(d => d.pioggia))
      });

      this.arrResponse = giorni.map(g => ({
        giorno: g.giorno,
        tempMin: g.tempMin?.toFixed?.(1) || '-',
        tempMax: g.tempMax?.toFixed?.(1) || '-',
        tempMedia: g.tempMedia?.toFixed?.(1) || '-',
        ventoMax: g.ventoMax?.toFixed?.(1) || '-',
        pressioneMin: g.pressioneMin?.toFixed?.(1) || '-',
        pressioneMax: g.pressioneMax?.toFixed?.(1) || '-',
        umiditaMin: g.umiditaMin?.toFixed?.(0) || '-',
        umiditaMax: g.umiditaMax?.toFixed?.(0) || '-',
        pioggiaMaxEvento: '-',
        pioggia: g.pioggia?.toFixed?.(1) || '-'
      }));
      this.dataSource.data = this.arrResponse;

      // --- 5️⃣ Calcolo riepilogo ANNUALE ---
      const annuale = {
        giorno: `Anno ${this.year}`,
        tempMin: min(allData.map(d => d.tempMin)),
        tempMax: max(allData.map(d => d.tempMax)),
        tempMedia: avg(allData.map(d => d.tempMedia)),
        ventoMax: max(allData.map(d => d.ventoMax)),
        pressioneMin: min(allData.map(d => d.pressioneMin)),
        pressioneMax: max(allData.map(d => d.pressioneMax)),
        umiditaMin: min(allData.map(d => d.umiditaMin)),
        umiditaMax: max(allData.map(d => d.umiditaMax)),
        pioggia: sum(allData.map(d => d.pioggia))
      };

      this.arrResponseAnno = [annuale].map(g => ({
        giorno: g.giorno,
        tempMin: g.tempMin?.toFixed?.(1) || '-',
        tempMax: g.tempMax?.toFixed?.(1) || '-',
        tempMedia: g.tempMedia?.toFixed?.(1) || '-',
        ventoMax: g.ventoMax?.toFixed?.(1) || '-',
        pressioneMin: g.pressioneMin?.toFixed?.(1) || '-',
        pressioneMax: g.pressioneMax?.toFixed?.(1) || '-',
        umiditaMin: g.umiditaMin?.toFixed?.(0) || '-',
        umiditaMax: g.umiditaMax?.toFixed?.(0) || '-',
        pioggiaMaxEvento: '-',
        pioggia: g.pioggia?.toFixed?.(1) || '-'
      }));
      this.dataSourceAnno.data = this.arrResponseAnno;

    } catch (err) {
      console.error('❌ Errore loadCumulusDayFileData:', err);
    } finally {
      this.imageLoader = false;
      this.imageLoaderAnno = false;
      this.isVisible = true;
      this.isVisibleAnno = true;
      this.dataLoaded.emit(true);
    }
  }

  private async loadXmlAnnualRawData(year: number, startMonth: number, endMonth: number): Promise<any[]> {
    const parser = new DOMParser();
    const result: any[] = [];

    for (let m = startMonth; m <= endMonth; m++) {
      const month = m.toString().padStart(2, '0');
      const listUrl = `assets/storico-treo/${year}/${month}/filelist.json`;

      try {
        const files = await this.http.get<string[]>(listUrl).toPromise();
        if (!files?.length) continue;

        for (const filename of files) {
          const xmlString = await this.http.get(`assets/storico-treo/${year}/${month}/${filename}`, { responseType: 'text' }).toPromise();
          if (!xmlString?.trim()) continue;

          const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
          const root = xmlDoc.querySelector('statistics');
          if (!root) continue;

          const val = (sel: string, attr?: string): number => {
            const el = xmlDoc.querySelector(sel);
            if (!el) return NaN;
            if (attr && el.hasAttribute(attr)) {
              return parseFloat(el.getAttribute(attr)?.replace(/[^\d.-]/g, '') || 'NaN');
            }
            const text = el.textContent?.replace(/[^\d.-]/g, '');
            return parseFloat(text || 'NaN');
          };

          const isNewFormat = xmlDoc.querySelector('outdoor_temperature')?.hasAttribute('max');
          const day = root.getAttribute('day') || filename.split('_')[2]?.split('.')[0] || '?';

          result.push({
            giorno: day.padStart(2, '0'),
            mese: m,
            anno: year % 100,
            tempMin: isNewFormat ? val('outdoor_temperature', 'min') : val('outdoor_temperature > min'),
            tempMax: isNewFormat ? val('outdoor_temperature', 'max') : val('outdoor_temperature > max'),
            tempMedia: isNewFormat
              ? val('outdoor_temperature', 'mean')
              : (val('outdoor_temperature > min') + val('outdoor_temperature > max')) / 2,
            ventoMax: isNewFormat ? val('wind_speed', 'max') : val('wind_speed > max'),
            pressioneMin: isNewFormat ? val('relative_pressure', 'min') : val('relative_pressure > min'),
            pressioneMax: isNewFormat ? val('relative_pressure', 'max') : val('relative_pressure > max'),
            umiditaMin: isNewFormat ? val('outdoor_humidity', 'min') : val('outdoor_humidity > min'),
            umiditaMax: isNewFormat ? val('outdoor_humidity', 'max') : val('outdoor_humidity > max'),
            pioggia: isNewFormat ? val('total-rainfall', 'value') : val('total-rainfall')
          });
        }
      } catch {
        continue;
      }
    }

    console.log(`📁 XML caricati per ${year}: ${result.length}`);
    return result;
  }




// 🔍 Parser per il dayfile.txt
  private parseDayfile(content: string, year: number): any[] {
    const righe = content.trim().split('\n');
    const yearShort = year % 100;
    const result: any[] = [];

    for (const riga of righe) {
      const c = riga.split(',');
      if (c.length < 25) continue;
      const [giorno, mese, anno] = c[0].split('/').map(Number);
      if (anno !== yearShort) continue;

      const safe = (v: string) => parseFloat(v) || 0;
      result.push({
        giorno: giorno.toString().padStart(2, '0'),
        mese,
        anno,
        tempMin: safe(c[4]),
        tempMax: safe(c[6]),
        pressioneMin: safe(c[8]),
        pressioneMax: safe(c[10]),
        pioggia: safe(c[12]),
        tempMedia: safe(c[15]) || (safe(c[4]) + safe(c[6])) / 2,
        umiditaMin: safe(c[19]),
        umiditaMax: safe(c[21]),
        ventoMax: safe(c[1])
      });
    }

    console.log(`✅ Parsed ${result.length} righe per ${year}`);
    return result;
  }

  //Get-ChildItem -Recurse -Directory | ForEach-Object { $xmls = Get-ChildItem $_.FullName -Filter *.xml -Name | Where-Object { $_ -match "^\d{4}_\d{2}_\d{2}\.xml$" } | Sort-Object; if ($xmls.Count -gt 0) { $jsonBody = ($xmls | ForEach-Object { '    "' + $_ + '"' }) -join ",`n"; $json = "[`n$jsonBody`n]"; $path = Join-Path $_.FullName "filelist.json"; Set-Content -Path $path -Value $json -Encoding UTF8; Write-Host "✅ Creato $path con $($xmls.Count) file XML"; } else { Write-Host "❌ Nessun file XML giornaliero in $($_.FullName)"; } }

  // 🔍 Cambio data nel datepicker
  filterData(selectedDate: Date = this.dateControl.value): void {
    if (!selectedDate) return;
    this.month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    this.year = selectedDate.getFullYear();
    this.loadCumulusDayFileData();
    this.precYear = this.year;
  }

  // 📆 Cambio mese con paginator
  public handlePage(e: PageEvent): void {
    if (!this.dateControl.value) return;
    let currentMonth = this.dateControl.value.getMonth();
    let currentYear = this.year;

    if (e.pageIndex > e.previousPageIndex) { currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; } }
    if (e.pageIndex < e.previousPageIndex) { currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; } }

    this.year = currentYear;
    this.month = (currentMonth + 1).toString().padStart(2, '0');
    this.currentPage = currentMonth;

    const selectedDate = new Date(currentYear, currentMonth, 1);
    this.dateControl.setValue(selectedDate, { emitEvent: false });

    console.log(`📅 Cambio mese → ${this.month}/${this.year}`);
    this.imageLoader = this.imageLoaderAnno = true;
    this.isVisible = this.isVisibleAnno = false;

    setTimeout(() => this.loadCumulusDayFileData(), 100);
  }

  // 📆 Cambio anno nel paginator annuale
  public handlePageAnno(e: PageEvent): void {
    const MIN_YEAR = 2013, MAX_YEAR = 2050;
    const goingForward = e.pageIndex > this.currentPageAnno;
    const goingBackward = e.pageIndex < this.currentPageAnno;

    if (goingForward && this.year < MAX_YEAR) this.year++;
    else if (goingBackward && this.year > MIN_YEAR) this.year--;
    else return;

    this.currentPageAnno = e.pageIndex;
    const selectedDate = new Date(this.year, this.dateControl.value.getMonth(), 1);
    this.dateControl.setValue(selectedDate, { emitEvent: false });
    console.log(`📆 Cambio anno → ${this.year}`);
    this.imageLoader = this.imageLoaderAnno = true;
    this.isVisible = this.isVisibleAnno = false;
    setTimeout(() => this.loadCumulusDayFileData(), 100);
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
