import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { OverallHoursComponent } from './overall-hours/overall-hours.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, OverallHoursComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
