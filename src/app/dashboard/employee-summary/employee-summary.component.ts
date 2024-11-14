import { Component } from '@angular/core';
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

interface IRow {
  name: string;
  timesheetExpected: number;
  unconfirmedTimesheet: number;
  confirmedTimesheet: number;
  missingTimesheet: number;
  image: string;
}

@Component({
  selector: 'dashboard-employee-summary',
  standalone: true,
  imports: [MatCardModule, AgGridAngular, MatGridListModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, SearchInputComponent],
  templateUrl: './employee-summary.component.html',
  styleUrl: './employee-summary.component.css'
})
export class EmployeeSummaryComponent {

  rowData: IRow[] = [
    { name: 'Theresa Webb', timesheetExpected: 54, unconfirmedTimesheet: 21, confirmedTimesheet: 22, missingTimesheet: 11, image: 'theresaWebb.png' },
    { name: 'Darrell Steward', timesheetExpected: 57, unconfirmedTimesheet: 12, confirmedTimesheet: 33, missingTimesheet: 12, image: 'DarrellSteward.png' },
    { name: 'Marvin McKinney', timesheetExpected: 99, unconfirmedTimesheet: 34, confirmedTimesheet: 44, missingTimesheet:21, image: 'marvinMcKinney.png' },
    { name: 'Brooklyn Simmons', timesheetExpected: 130, unconfirmedTimesheet: 44, confirmedTimesheet: 55, missingTimesheet: 31, image: 'brooklynSimmons.png' },
    { name: 'Wade Warren', timesheetExpected: 128, unconfirmedTimesheet: 21, confirmedTimesheet: 66, missingTimesheet: 41, image: 'marvinMcKinney.png' }
  ];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef<IRow>[] = [
    { field: 'name', cellRenderer: AvatarRendererComponent}, 
    { field: 'timesheetExpected' }, 
    { field: 'unconfirmedTimesheet' }, 
    { field: 'confirmedTimesheet' }, 
    { field: 'missingTimesheet' }];

  defaultColDef: ColDef = {
      flex: 1,
  };

}