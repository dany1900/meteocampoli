import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TerremotiResponse} from '../terremoti.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormControl, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';


@Component({
  selector: 'terremoti-italia',
  templateUrl: './terremoti-italia.component.html',
  styleUrls: ['./terremoti-italia.component.css']
})
export class TerremotiItaliaComponent implements OnInit, AfterViewInit {
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
  imageLoader = false;
  arrResponse: TerremotiResponse[] = [];
  displayedColumns: string[] = ['dataOra', 'magnitudo', 'zona', 'profondita'];
  dataSource = new MatTableDataSource<TerremotiResponse>(this.arrResponse);
  isVisible = false;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  public pageSize = 20;
  public currentPage = 0;
  public totalSize = 0;
  pageEvent: PageEvent;
  magnitudos: number[] = [
    1, 2, 3, 4, 5, 6, 7
  ];
  selectedMagnitudo = this.magnitudos;
  terremotiFormGroup: FormGroup;

  constructor(private seo: SEOService, protected router: Router, public utilityService: UtiliyService, private http: HttpClient) {
    this.title = 'Terremoti Elenco Italia - Meteo Campoli';
    this.description = 'Riepilogo delle ultime rilevazioni dei terremoti. Possibilita di accedere a tutte le statistiche mediante indirizzamento. Mappa pericolosità sismica. Focus sull\'Italia';
    this.keywords = 'terremoti meteo campoli, lista terremoti, ultimi terremoti campoli, terremoti campoli appennino, ultimo terremoto campoli, lista terremoti campoli appennino,elenco terremoti in italia, lista ultimi terremoti,lista terremoti ingv aggiornata,elenco sismico italiano,iside terremoti,iside lista terremoti,elenco scosse terremoto,terremoti elenco,ingv lista terremoti iside,meteo terremoti altervista,istituto nazionale geofisica e vulcanologia lista terremoti,lista terremoti italia,elenco terremoti italia,elenco terremoti,lista terremoti qualsiasi magnitudo,bollettino terremoti';
    this.ogUrl = 'www.meteocampoli.altervista.org/terremoti/italia';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.tabellaTerremoti(null, null, null, null);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.utilityService.scrollToSpecifyPosition();
    this.initForm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  tabellaTerremoti(minMag: number, maxMag: number, startDate: string, endDate: string) {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const d = new Date(today);
    d.setDate(d.getDate() - 4); // subtract 4 days
    const dateMinus4Day = d.toISOString().split('T')[0];
    if (!minMag) {
      minMag = 2;
    }
    const url = 'https://webservices.ingv.it/fdsnws/event/1/query';
    const headers = new HttpHeaders();
    headers.set('content-type', 'text/plain; charset=utf-8');
    let queryParams = new HttpParams();
    queryParams = queryParams.append('starttime', dateMinus4Day);
    if (endDate) {
      queryParams = queryParams.append('endtime', endDate);
    }
    queryParams = queryParams.append('minmag', minMag);
    if (maxMag) {
      queryParams = queryParams.append('maxmag', maxMag);
    }
    queryParams = queryParams.append('orderby', 'time');
    queryParams = queryParams.append('format', 'text');
    queryParams = queryParams.append('includeallorigins', false);
    queryParams = queryParams.append('includeallmagnitudes', false);
    queryParams = queryParams.append('includeallstationsmagnitudes', false);
    queryParams = queryParams.append('includearrivals', false);
    return this.http.get(url, {headers: headers, params: queryParams, responseType: 'text'}).subscribe(data => {
      const eachLine = data?.toString().split('\n');
      let count = 0;
      eachLine?.forEach((line: string) => {
        if (count !== 0) {
          const lineSplit = line.split('|');
          const date = new Date(lineSplit[1]);
          const dateFormatted = date.toLocaleString().replace(',', ' ');
          const terremoti: TerremotiResponse = {
            dataOra: dateFormatted,
            magnitudo: lineSplit[10],
            profondita: lineSplit[4],
            zona: lineSplit[12],
          };
          this.arrResponse.push(terremoti);
          this.isVisible = true;
        }
        count++;
      });
      if (this.isVisible) {
        this.dataSource = new MatTableDataSource<TerremotiResponse>(this.arrResponse);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalSize = this.arrResponse.length;
        this.iterator();
        this.imageLoader = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.arrResponse.slice(start, end);
    this.dataSource = new MatTableDataSource<TerremotiResponse>(part);
  }

  onKey(value) {
    /*this.selectedMagnitudo = this.searchMagnitudo(value);*/
  }

  searchMagnitudo(value: number) {
    const filter = value;
    return this.magnitudos.filter(option => option === filter);
  }

  private initForm() {
    this.terremotiFormGroup = new FormGroup({
      magnitudoMinimaControl: new FormControl(),
      magnitudoMassimaControl: new FormControl()
    });

  }

  submitTerremoti() {
    const magMin = this.terremotiFormGroup.get('magnitudoMinimaControl').value;
    const magMax = this.terremotiFormGroup.get('magnitudoMassimaControl').value;
    this.tabellaTerremoti(magMin, magMax, null, null);
  }

  /*searchMagnitudo(value: string) {
    const filter = value.toLowerCase();
    return this.magnitudos.filter(option => option.startsWith(filter));
  }*/
}
