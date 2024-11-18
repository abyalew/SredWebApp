import { Component, computed, OnDestroy, Signal } from '@angular/core';
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
import { DashboardService, SredSummary } from '../../../services/dashboard.service';
import { DataLoader } from '../../../../utility/dataLoader';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Subscription } from 'rxjs';
import { RefreshEventService } from '../../../services/refreshEvent.service';



@Component({
  selector: 'desktop-sred-summary',
  standalone: true,
  imports: [MatCardModule, AgGridAngular, MatGridListModule, MatFormFieldModule, 
    MatInputModule, MatIconModule, MatButtonModule, SearchInputComponent, CommonModule, SpinnerComponent],
  templateUrl: './sred-summary.component.html',
  styleUrl: './sred-summary.component.css'
})
export class SredSummaryComponent implements OnDestroy {
  dataLoader: DataLoader<SredSummary[]>;
  rowData: Signal<SredSummary[]>;
  refreshEventSubscription: Subscription;
  searchValue: string = "";
  colDefs: ColDef<SredSummary>[] = [
    { field: 'name', cellRenderer: AvatarRendererComponent}, 
    { field: 'trackingScore' }, 
    { field: 'expectedHours' }, 
    { field: 'workedHours' }, 
    { field: 'trackedHours' },
    { field: 'new' }, { field: 'fiber' }, { field: 'fdTest' }, { field: 'sredHour' }
  ];

  defaultColDef: ColDef = {
      flex: 1,
  };

  constructor(private dashboardService: DashboardService, refreshEventService: RefreshEventService){
    this.dataLoader = new DataLoader<SredSummary[]>();
    this.refreshEventSubscription = refreshEventService.refreshObservable.subscribe(()=>{
      this.loadData();
    })
    this.rowData = computed(() => {
      return this.dataLoader.data()?.filter(d => this.searchValue == undefined || this.searchValue == null || this.searchValue.trim() == "" || d.name.toLowerCase().includes(this.searchValue.toLowerCase())) ?? [];
    });
    this.loadData();
  }

  loadData(){
    this.dataLoader.load(this.dashboardService.getSredSummary());
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
