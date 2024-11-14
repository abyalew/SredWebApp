import { Component, computed, OnDestroy, Signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { TimesheetCardComponent, TimesheetData } from './timesheet-card/timesheet-card.component';
import { CommonModule } from '@angular/common';
import { DashboardService, TimesheetSummary } from '../../../../services/dashboard.service';
import { DataLoader } from '../../../../utility/dataLoader';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { RefreshEventService } from '../../../../services/refreshEvent.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'dashboard-timesheet-summary',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatChipsModule, MatIconModule, 
    TimesheetCardComponent, SpinnerComponent],
  templateUrl: './timesheet-summary.component.html',
  styleUrl: './timesheet-summary.component.css'
})
export class TimesheetSummaryComponent implements OnDestroy {
  timesheetSummaryReports : Signal<TimesheetData[]>;
  dataLoader: DataLoader<TimesheetSummary[]>;
  refreshEventSubscription: Subscription;
  constructor(private readonly dashboardService: DashboardService, refreshEventService: RefreshEventService) {
    this.dataLoader = new DataLoader<TimesheetSummary[]>();
    this.refreshEventSubscription = refreshEventService.refreshObservable.subscribe(() => {
      this.loadDate();
    })

    this.timesheetSummaryReports = computed(() => {
      return this.dataLoader.data() ?? []
    })
    this.loadDate();
  }

  loadDate(){
    this.dataLoader.load(this.dashboardService.getTimesheetSummaries());
  }

  ngOnDestroy(): void {
    this.refreshEventSubscription.unsubscribe();
  }
}
