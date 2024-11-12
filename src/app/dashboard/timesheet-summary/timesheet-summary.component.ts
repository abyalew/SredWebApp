import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'dashboard-timesheet-summary',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './timesheet-summary.component.html',
  styleUrl: './timesheet-summary.component.css'
})
export class TimesheetSummaryComponent {

}
