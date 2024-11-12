import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { OverallHoursComponent } from './overall-hours/overall-hours.component';
import { TimesheetSummaryComponent } from './timesheet-summary/timesheet-summary.component';
import { ProjectHoursComponent } from './project-hours/project-hours.component';
import { EmployeeSummaryComponent } from './employee-summary/employee-summary.component';
import { SredSummaryComponent } from './sred-summary/sred-summary.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, OverallHoursComponent, TimesheetSummaryComponent, ProjectHoursComponent, EmployeeSummaryComponent, SredSummaryComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
