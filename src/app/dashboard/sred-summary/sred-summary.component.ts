import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface IRow {
  name: string;
  trackingScore: number;
  expectedHours: number;
  workedHours: number;
  trackedHours: number;
  new: number;
  fiber: number;
  fdTest: number;
  sredHour: number;
}

@Component({
  selector: 'desktop-sred-summary',
  standalone: true,
  imports: [MatCardModule, AgGridAngular, MatGridListModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './sred-summary.component.html',
  styleUrl: './sred-summary.component.css'
})
export class SredSummaryComponent {

  rowData: IRow[] = [
    { name: 'Theresa Webb', trackingScore: 70, expectedHours: 120, workedHours: 20, trackedHours: 40, new: 10, fiber: 0, fdTest:40, sredHour: 40 },
    { name: 'Darrell Steward', trackingScore: 87, expectedHours: 100, workedHours: 10, trackedHours: 55, new: 22, fiber: 0, fdTest:55, sredHour: 55},
    { name: 'Marvin McKinney', trackingScore: 125, expectedHours: 160, workedHours: 60, trackedHours: 10, new: 55, fiber: 0, fdTest:10, sredHour: 10 },
    { name: 'Brooklyn Simmons', trackingScore: 152, expectedHours: 220, workedHours: 22, trackedHours: 70, new: 60, fiber: 0, fdTest:70, sredHour: 70 },
    { name: 'Wade Warren', trackingScore: 95, expectedHours: 120, workedHours: 12, trackedHours: 50, new: 33, fiber: 0, fdTest:50, sredHour: 50 }
  ];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef<IRow>[] = [{ field: 'name' }, { field: 'trackingScore' }, { field: 'expectedHours' }, { field: 'workedHours' }, { field: 'trackedHours' },
    { field: 'new' }, { field: 'fiber' }, { field: 'fdTest' }, { field: 'sredHour' }
  ];

  defaultColDef: ColDef = {
      flex: 1,
  };
}
