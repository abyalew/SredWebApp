import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RefreshEventService } from '../../../services/refreshEvent.service';
import {selectCurrentFiscalPeriod} from '../../../state/fiscalPeriod/fiscalPeriod.selector';
import {Store} from '@ngrx/store';
import {AppState} from '../../../state/app.state';
import {Subscription} from 'rxjs';
import {FiscalPeriod} from '../../../models/fiscalPeriod';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  selectCurrentFiscalPeriodSub: Subscription;
  currentFiscalPeriod: FiscalPeriod| null = null;
  constructor(public refreshEventService: RefreshEventService, private store: Store<AppState>) {
    this.selectCurrentFiscalPeriodSub = this.store.select(selectCurrentFiscalPeriod).subscribe(fiscalPeriod => {
      this.currentFiscalPeriod = fiscalPeriod;
      refreshEventService.triggerRefresh({ dateFrom: fiscalPeriod!.startDate, dateTo: fiscalPeriod?.endDate });
    });

  }
}
