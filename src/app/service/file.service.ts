// file.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {}

  // Metodo per caricare e parsare un file CSV
  loadCSV(filePath: string): Observable<any[]> {
    return new Observable(observer => {
      this.http.get(filePath, { responseType: 'text' }).subscribe(data => {
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
}
