// file.service.ts
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {
  }

  // Metodo per caricare e parsare un file CSV
  loadCSV(filePath: string): Observable<any[]> {
    return new Observable(observer => {
      this.http.get(filePath, {responseType: 'text'}).subscribe(data => {
        Papa.parse(data, {
          header: true,
          complete: (result) => {
            observer.next(result.data);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          }
        });
      });
    });
  }

  // Metodo per ottenere il CSV da un URL
  getCSV(url: string): Observable<any> {
    // Definire le intestazioni
    const headers = new HttpHeaders({
      'Content-Type': 'text/csv',
      'Accept': 'text/csv'
    });
    return this.http.get(url, {
      headers: headers,
      responseType: 'text'
    });
  }

  // Metodo per parsare il CSV
  parseCSV(csvData: string, delimiter: string): any[] {
    const parsedData = Papa.parse(csvData, {
      header: true,  // Puoi impostarlo su 'true' se il CSV ha intestazioni
      skipEmptyLines: true,
      delimiter: delimiter,  // Specifica il delimitatore
    });
    return parsedData.data;  // Restituisce i dati parsati
  }
}
