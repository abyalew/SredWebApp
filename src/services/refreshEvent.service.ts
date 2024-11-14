import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RefreshEventService {

  public refresh = new BehaviorSubject<boolean>(false);
  refreshObservable = this.refresh.asObservable();

  triggerRefresh (): void {
    this.refresh.next(true);
  }
}