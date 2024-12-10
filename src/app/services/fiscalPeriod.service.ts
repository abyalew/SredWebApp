import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/project';
import {FiscalPeriod} from '../models/fiscalPeriod';

@Injectable({
  providedIn: 'root',
})
export class FiscalPeriodService {
  constructor(private readonly httpClient : HttpClient){ }
  baseUrl: string = "https://localhost:7059/FiscalPeriod/";
  getAll() : Observable<FiscalPeriod[]> {
    return this.httpClient.get<FiscalPeriod[]>(`${ this.baseUrl }GetFiscalPeriods`, );
  }
}
