import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  // declares that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class DashboardService {
    constructor(private readonly httpClient : HttpClient){}

    getTimesheetStatus(datefrom: Date | null | undefined, dateTo: Date | null | undefined) : Observable<SimpleObject[]> {
        return this.httpClient.get<SimpleObject[]>("https://localhost:7059/Dashboard/GetTimesheetStatus",
            { params: {datefrom: datefrom?.toDateString() ?? '', dateTo: dateTo?.toDateString() ?? ''} }
        );
    }

    getTimesheetStatusByMonth() : Observable<TimesheetByMonth[]> {
        return this.httpClient.get<TimesheetByMonth[]>("https://localhost:7059/Dashboard/GetTimesheetStatusByMonth");
    }

    getTimesheetSummaries() : Observable<TimesheetSummary[]> {
        return this.httpClient.get<TimesheetSummary[]>("https://localhost:7059/Dashboard/GetTimesheetSummaries");
    }

    getProjectHours() : Observable<ProjectHour[]> {
        return this.httpClient.get<ProjectHour[]>("https://localhost:7059/Dashboard/GetProjectHours");
    }

    getEmployeeSummary() : Observable<EmployeeSummary[]> {
        return this.httpClient.get<EmployeeSummary[]>("https://localhost:7059/Dashboard/GetEmployeeSummary");
    }

    getSredSummary() : Observable<SredSummary[]> {
        return this.httpClient.get<SredSummary[]>("https://localhost:7059/Dashboard/GetSredSummary");
    }
}


export interface SimpleObject{
    name: string,
    value: number
}
export interface TimesheetByMonth
{
    month: string;
    cumulativeHours: number;
    tootalHours: number;
}
export interface TimesheetSummary
{
    title: string;
    value: number;
    status: number;
    percentage: number;
}

export interface EmployeeSummary
{
    name: string;
    timesheetExpected: number;
    unconfirmedTimesheet: number;
    confirmedTimesheet: number;
    missingTimesheet: number;
    image: string;
}

export interface SredSummary {
    name: string;
    trackingScore: number;
    expectedHours: number;
    workedHours: number;
    trackedHours: number;
    new: number;
    fiber: number;
    fdTest: number;
    sredHour: number;
    image: string;
  }

export interface ProjectHour
{
    name: string;
    totalHours: number;
    color: string;
}
