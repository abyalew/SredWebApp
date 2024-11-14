import { Component, computed, Signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchInputComponent } from '../../../shared/search-input/search-input.component';
import { AvatarRendererComponent } from '../../../shared/avatar/avatar.renderer.component';
import { DashboardService, EmployeeSummary } from '../../../../services/dashboard.service';
import { DataLoader } from '../../../../utility/dataLoader';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { RefreshEventService } from '../../../../services/refreshEvent.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'dashboard-employee-summary',
  standalone: true,
  imports: [MatCardModule, AgGridAngular, MatGridListModule, MatFormFieldModule, 
    MatInputModule, MatIconModule, MatButtonModule, SearchInputComponent, 
     CommonModule, SpinnerComponent],
  templateUrl: './employee-summary.component.html',
  styleUrl: './employee-summary.component.css'
})
export class EmployeeSummaryComponent implements OnDestroy {
  rowData: Signal<EmployeeSummary[]>;
  dataLoader: DataLoader<EmployeeSummary[]>;
  refreshEventSubscription: Subscription;
  colDefs: ColDef<EmployeeSummary>[] = [
    { field: 'name', cellRenderer: AvatarRendererComponent}, 
    { field: 'timesheetExpected' }, 
    { field: 'unconfirmedTimesheet' }, 
    { field: 'confirmedTimesheet' }, 
    { field: 'missingTimesheet' }
  ];

  defaultColDef: ColDef = {
      flex: 1,
  };

  searchValue = "";
  constructor(private dashboardService: DashboardService, private refreshEventService: RefreshEventService){
    this.dataLoader = new DataLoader<EmployeeSummary[]>();
    this.refreshEventSubscription = refreshEventService.refreshObservable.subscribe(()=> {
      this.loadData();
    });
    this.rowData = computed(() => {
      return this.dataLoader.data()?.filter(d => this.searchValue == undefined || this.searchValue == null || this.searchValue.trim() == "" || d.name.toLowerCase().includes(this.searchValue.toLowerCase())) ?? [];
    });

    this.loadData();
  }
  
  loadData(){
    this.dataLoader.load(this.dashboardService.getEmployeeSummary());
  }

  onSearchChanged(value: string) {
    console.log("Search data changed: " + value);
    this.searchValue = value;
    this.dataLoader.data.set([...(this.dataLoader.data() ?? [])]);
  }

  ngOnDestroy(): void {
    this.refreshEventSubscription.unsubscribe();
  }
}