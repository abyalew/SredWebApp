import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface FilterParam{
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
}
@Injectable({
    providedIn: 'root'
})
export class RefreshEventService {


  public refresh = new BehaviorSubject<FilterParam | undefined>({ dateFrom: undefined, dateTo: undefined});
  refreshObservable = this.refresh.asObservable();

  triggerRefresh (filter: FilterParam | undefined): void {
    this.refresh.next(filter);
  }
}