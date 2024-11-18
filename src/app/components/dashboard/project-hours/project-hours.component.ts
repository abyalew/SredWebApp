import { Component, computed, OnDestroy, Signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {MatGridListModule} from '@angular/material/grid-list';
import { DashboardService, ProjectHour } from '../../../services/dashboard.service';
import { DataLoader } from '../../../../utility/dataLoader';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { RefreshEventService } from '../../../services/refreshEvent.service';
import { Subscription } from 'rxjs';

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
export class ProjectHoursComponent implements OnDestroy {
  dataLoader: DataLoader<ProjectHour[]>;
  public chartOptions: Signal<AgChartOptions>;
  refreshEventSubscription: Subscription;
 
 constructor(private readonly dashboardService: DashboardService, refreshEventService: RefreshEventService) {
  this.dataLoader = new DataLoader<ProjectHour[]>();
  this.refreshEventSubscription = refreshEventService.refreshObservable.subscribe(()=> {
    this.loadData();
  });
  this.loadData();
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
 loadData() {
  this.dataLoader.load(this.dashboardService.getProjectHours());
 }

  ngOnDestroy(): void {
    this.refreshEventSubscription.unsubscribe();
  }
}
