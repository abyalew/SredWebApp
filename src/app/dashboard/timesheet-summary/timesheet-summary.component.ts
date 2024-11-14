import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { TimesheetCardComponent, TimesheetData } from './timesheet-card/timesheet-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dashboard-timesheet-summary',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatChipsModule, MatIconModule, TimesheetCardComponent],
  templateUrl: './timesheet-summary.component.html',
  styleUrl: './timesheet-summary.component.css'
})
export class TimesheetSummaryComponent {
  timesheetSummaryReports : TimesheetData[] = [
    { title: 'Timesheets Expected', value: 500, status: 1, percentage: 20 },
    { title: 'Timesheets Created', value: 200, status: -1, percentage: 10 },
    { title: 'Timesheets Accepted', value: 200, status: 1, percentage: 20 },
    { title: 'Missing Timesheet', value: 300, status: -1, percentage: 10 }
  ];
}
