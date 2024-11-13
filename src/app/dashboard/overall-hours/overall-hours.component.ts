import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'dashboard-overall-hours',
  standalone: true,
  imports: [MatCardModule, AgCharts, MatGridListModule],
  templateUrl: './overall-hours.component.html',
  styleUrl: './overall-hours.component.css'
})
export class OverallHoursComponent {

  public chartOptions: AgChartOptions;
  public barChartOptions: AgChartOptions;
  constructor() {
    this.chartOptions = {
      data: [
        { name: "Total Worked Hours", value: 600 },
        { name: "Total Tracked Hours", value: 400 }
      ],
      // title: {
      //   text: "Total Hours",
      // },
      series: [
        {
          type: "donut",
          angleKey: "value",
          legendItemKey: "name",

          
          innerRadiusRatio: 0.5,
          innerLabels: [
            {
              text: "Total Hours",
              fontFamily: "Plus Jakarta Sans",
              fontSize: 12,
              fontWeight: "bold",
              color: "#000"
            },
            {
              text: "$1,000",
              fontFamily: "Plus Jakarta Sans",
              fontSize: 14,
              fontWeight: "bold",
              color: "#000"
            },
          ],
        },
      ],
      background: {
        fill: "#FBFBFB",
      },
    };
    this.barChartOptions = {
        data: this.getBarChartData(),
        series: [
          {
            type: "bar",
            xKey: "month",
            yKey: "cumulativehours",
            yName: "Cumulative Hours",
          },
          {
            type: "bar",
            xKey: "month",
            yKey: "tootalHours",
            yName: "Tootal Hours",
          }
        ],
        background: {
          fill: "#FBFBFB",
        },
    };

  }

  getBarChartData() {
    return [
      {
        month: "Jan",
        cumulativehours: 500,
        tootalHours: 55
      },
      {
        month: "Feb",
        cumulativehours: 500,
        tootalHours: 200
      },
      {
        month: "Mar",
        cumulativehours: 990,
        tootalHours: 80
      },
      {
        month: "Apr",
        cumulativehours: 700,
        tootalHours: 280
      },
      {
        month: "May",
        cumulativehours: 500,
        tootalHours: 200
      },
      {
        month: "Jun",
        cumulativehours: 85,
        tootalHours: 30
      },
      {
        month: "Jul",
        cumulativehours: 85,
        tootalHours: 55
      },
      {
        month: "Aug",
        cumulativehours: 500,
        tootalHours: 55
      },
      {
        month: "Sep",
        cumulativehours: 300,
        tootalHours: 85
      },
    ];
  }
}
