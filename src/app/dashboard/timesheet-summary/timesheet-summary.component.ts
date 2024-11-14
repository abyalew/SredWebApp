import { Component, computed, Signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { TimesheetCardComponent, TimesheetData } from './timesheet-card/timesheet-card.component';
import { CommonModule } from '@angular/common';
import { DashboardService, TimesheetSummary } from '../../../services/dashboard.service';
import { DataLoader } from '../../../utility/dataLoader';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';


@Component({
  selector: 'dashboard-timesheet-summary',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatChipsModule, MatIconModule, 
    TimesheetCardComponent, SpinnerComponent],
  templateUrl: './timesheet-summary.component.html',
  styleUrl: './timesheet-summary.component.css'
})
export class TimesheetSummaryComponent {
  timesheetSummaryReports : Signal<TimesheetData[]>;
  dataLoader: DataLoader<TimesheetSummary[]>;
  constructor(dashboardService: DashboardService){
    this.dataLoader = new DataLoader<TimesheetSummary[]>();
    this.timesheetSummaryReports = computed(() => {
      return this.dataLoader.data() ?? []
    })
    this.dataLoader.load(dashboardService.getTimesheetSummaries());
  }
}
