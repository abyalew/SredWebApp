import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'dashboard-project-hours',
  standalone: true,
  imports: [MatCardModule, AgCharts, MatGridListModule],
  templateUrl: './project-hours.component.html',
  styleUrl: './project-hours.component.css'
})
export class ProjectHoursComponent {
 public chartOptions: AgChartOptions;
 
 constructor() {
  this.chartOptions = {
    data: [
      { name: "Apple", totalHours: 250 },
      { name: "Walmart", totalHours: 600 },
      { name: "Microsoft", totalHours: 40 },
      { name: "Project1", totalHours: 150 },
      { name: "Project2", totalHours: 380 },
      { name: "Project3", totalHours: 550 },
      { name: "Project4", totalHours: 180 },
      { name: "Project5", totalHours: 490 },
      { name: "Project6", totalHours: 150 },
      { name: "Project7", totalHours: 35 },
    ],
    series: [
      {
        type: "bar",
        xKey: "name",
        yKey: "totalHours",
        yName: "Total Hours",
      }
    ],
    background: {
      fill: "#FBFBFB",
    },
  }
  
 }
}
