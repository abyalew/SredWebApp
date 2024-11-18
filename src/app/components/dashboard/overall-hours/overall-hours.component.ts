import { Component, computed, OnDestroy, signal, Signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {MatGridListModule} from '@angular/material/grid-list';
import { DashboardService, SimpleObject, TimesheetByMonth } from '../../../services/dashboard.service';
import { DataLoader } from '../../../../utility/dataLoader';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { FilterParam, RefreshEventService } from '../../../services/refreshEvent.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-overall-hours',
  standalone: true,
  imports: [MatCardModule, AgCharts, MatGridListModule, CommonModule, SpinnerComponent],
  templateUrl: './overall-hours.component.html',
  styleUrl: './overall-hours.component.css'
})
export class OverallHoursComponent implements OnDestroy {

  public chartOptions: Signal<AgChartOptions>;
  public barChartOptions: Signal<AgChartOptions>;

  dataLoader: DataLoader<SimpleObject[]>;
  barChartDataLoader: DataLoader<TimesheetByMonth[]>;
  refreshEventSubscription: Subscription;

  constructor(private readonly dashboardService : DashboardService, refreshEventService: RefreshEventService) {

    this.dataLoader = new DataLoader<SimpleObject[]>();
    this.barChartDataLoader = new DataLoader<TimesheetByMonth[]>();

    this.refreshEventSubscription = refreshEventService.refreshObservable.subscribe((filterParam)=> {
      this.loadData(filterParam);
      
    });

    this.loadData(undefined);

    this.chartOptions = computed(() : AgChartOptions => {
      const total = this.dataLoader.data()?.reduce((sum, curr) => sum + Number(curr.value), 0).toString() ?? "0";
      return {        
        data: this.dataLoader.data()?.map(x => { 
          return { name: x.name, value: Number(x.value)};
        } ),
        series: [
          {
            type: "donut",
            angleKey: "value",
            legendItemKey: "name",
            innerRadiusRatio: 0.5,
            innerLabels: [
              {
                text: "Total Hours",
                fontSize: 12,
                fontWeight: "bold",
                color: "#000"
              },
              {
                text: total,
                fontSize: 14,
                fontWeight: "bold",
                color: "#000"
              },
            ],
            fills: ['#03BCF3', '#091836']
          },
        ],
        background: {
          fill: "#FBFBFB",
        },
      };
    });
    this.barChartOptions = computed(() : AgChartOptions => {
      return {
        data: this.barChartDataLoader.data()?.map(x => { 
          return { month: x.month, cumulativeHours: Number(x.cumulativeHours), tootalHours: Number(x.tootalHours)};
        }),
        series: [
          {
            type: "bar",
            xKey: "month",
            yKey: "cumulativeHours",
            yName: "Cumulative Hours",
            cornerRadius: 4,
            fill: "#03BCF3"
          },
          {
            type: "bar",
            xKey: "month",
            yKey: "tootalHours",
            yName: "Tootal Hours",
            cornerRadius: 4,
            fill: "#091836"
          }
        ],
        background: {
          fill: "#FBFBFB",
        },
        axes:[
          {
            position: "bottom",
            type: "category"
          },
          {
            position: "left",
            type: "number",
            keys: ["cumulativeHours", "tootalHours"],
            label: {
              formatter: (params) => {
                return params.value + ' hrs';
              }
            }
          }
        ]
      };
    });
  }

  loadData(filterParam: FilterParam | undefined) {
    this.dataLoader.load(this.dashboardService.getTimesheetStatus(filterParam?.dateFrom, filterParam?.dateTo));
    this.barChartDataLoader.load(this.dashboardService.getTimesheetStatusByMonth());
  }

  ngOnDestroy(): void {
    this.refreshEventSubscription.unsubscribe();
  }
}
