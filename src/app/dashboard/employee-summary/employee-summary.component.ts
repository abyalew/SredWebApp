import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchInputComponent } from '../../shared/search-input/search-input.component';
import { AvatarRendererComponent } from '../../shared/avatar/avatar.renderer.component';
import { DashboardService, EmployeeSummary } from '../../../services/dashboard.service';
import { DataLoader } from '../../../utility/dataLoader';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';


@Component({
  selector: 'dashboard-employee-summary',
  standalone: true,
  imports: [MatCardModule, AgGridAngular, MatGridListModule, MatFormFieldModule, 
    MatInputModule, MatIconModule, MatButtonModule, SearchInputComponent, 
     CommonModule, SpinnerComponent],
  templateUrl: './employee-summary.component.html',
  styleUrl: './employee-summary.component.css'
})
export class EmployeeSummaryComponent {
  rowData: Signal<EmployeeSummary[]>;
  dataLoader: DataLoader<EmployeeSummary[]>;
  constructor(dashboardService: DashboardService){
    this.dataLoader = new DataLoader<EmployeeSummary[]>();
    this.rowData = computed(() => {
      return this.dataLoader.data() ?? [];
    });
    this.dataLoader.load(dashboardService.getEmployeeSummary());
  }
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

}