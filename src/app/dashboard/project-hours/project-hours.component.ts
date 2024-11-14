import { Component, computed, Signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {MatGridListModule} from '@angular/material/grid-list';
import { DashboardService, ProjectHour } from '../../../services/dashboard.service';
import { DataLoader } from '../../../utility/dataLoader';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

export interface ChartData {
  name: string;
  totalHours: number;
  color: string;
}

@Component({
  selector: 'dashboard-project-hours',
  standalone: true,
  imports: [MatCardModule, AgCharts, MatGridListModule, CommonModule, SpinnerComponent],
  templateUrl: './project-hours.component.html',
  styleUrl: './project-hours.component.css'
})
export class ProjectHoursComponent {
  dataLoader: DataLoader<ProjectHour[]>;
  public chartOptions: Signal<AgChartOptions>;
 
 constructor(dashboardService: DashboardService) {
  this.dataLoader = new DataLoader<ProjectHour[]>();
  this.dataLoader.load(dashboardService.getProjectHours());

  this.chartOptions = computed(()=> {
    return {
      data: this.dataLoader.data(),
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
    };
  }) 
  
 }
}
