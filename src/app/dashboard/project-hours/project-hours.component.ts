import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {MatGridListModule} from '@angular/material/grid-list';

export interface ChartData {
  name: string;
  totalHours: number;
  color: string;
}

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
      { name: "Apple", totalHours: 250, color: '#00A4FF' },
      { name: "Walmart", totalHours: 600, color: '#FA6800' },
      { name: "Microsoft", totalHours: 40, color: '#AF332D' },
      { name: "Project1", totalHours: 150, color: '#3F1EB5' },
      { name: "Project2", totalHours: 380, color: '#7555CB' },
      { name: "Project3", totalHours: 550, color: '#9A1CCC' },
      { name: "Project4", totalHours: 180, color: '#50D9A2' },
      { name: "Project5", totalHours: 490, color: '#BF5782' },
      { name: "Project6", totalHours: 150, color: '#3C3C3C' },
      { name: "Project7", totalHours: 35, color: '#63D11F' },
    ],
    series: [
      {
        type: "bar",
        xKey: "name",
        yKey: "totalHours",
        yName: "Total Hours",
        itemStyler:({ datum, xKey, fill, highlighted }) => {
          return {
            fill: datum.color,
            barPadding: 0.2
          };
        },
      },
    ],
    background: {
      fill: "#FBFBFB",
    },
  }
  
 }
}
