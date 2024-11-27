import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Project } from '../../models/project';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadDialogComponent } from '../../shared/file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, AgGridAngular, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly dialog = inject(MatDialog);
  dialogConfig: MatDialogConfig = {
    disableClose: true
  }
  colDefs: ColDef<Project>[] = [
    { field: 'name'},
    { field: 'description' },
    { field: 'integrationOf' },
    { field: 'timeRecords' },
    { field: 'totalHours' },
    { field: 'createdBy' },
    { field: 'createdOn' },
    { field: 'isIncluded' }
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  rowData: Project[] = [
    {
      name: 'test 1',
      createdBy: 'sredAdmin',
      createdOn: new Date(),
      isIncluded: false,
      description: 'my test project',
      integrationOf: 'the integration',
      timeRecords: '235',
      totalHours: '300'
    },
    {
      name: 'test 1',
      createdBy: 'sredAdmin',
      createdOn: new Date(),
      isIncluded: true,
      description: 'my test project',
      integrationOf: 'the integration',
      timeRecords: '235',
      totalHours: '300'
    },
    {
      name: 'test 1',
      createdBy: 'sredAdmin',
      createdOn: new Date(),
      isIncluded: false,
      description: 'my test project',
      integrationOf: 'the integration',
      timeRecords: '235',
      totalHours: '300'
    },
    {
      name: 'test 1',
      createdBy: 'sredAdmin',
      createdOn: new Date(),
      isIncluded: false,
      description: 'my test project',
      integrationOf: 'the integration',
      timeRecords: '235',
      totalHours: '300'
    },
    {
      name: 'test 1',
      createdBy: 'sredAdmin',
      createdOn: new Date(),
      isIncluded: true,
      description: 'my test project',
      integrationOf: 'the integration',
      timeRecords: '235',
      totalHours: '300'
    },
    {
      name: 'test 1',
      createdBy: 'sredAdmin',
      createdOn: new Date(),
      isIncluded: true,
      description: 'my test project',
      integrationOf: 'the integration',
      timeRecords: '235',
      totalHours: '300'
    },
    {
      name: 'test 1',
      createdBy: 'sredAdmin',
      createdOn: new Date(),
      isIncluded: false,
      description: 'my test project',
      integrationOf: 'the integration',
      timeRecords: '235',
      totalHours: '300'
    },
    {
      name: 'test 1',
      createdBy: 'sredAdmin',
      createdOn: new Date(),
      isIncluded: true,
      description: 'my test project',
      integrationOf: 'the integration',
      timeRecords: '235',
      totalHours: '300'
    },
    {
      name: 'test 1',
      createdBy: 'sredAdmin',
      createdOn: new Date(),
      isIncluded: false,
      description: 'my test project',
      integrationOf: 'the integration',
      timeRecords: '235',
      totalHours: '300'
    },
  ];

  openDialog() {
    const dialogRef = this.dialog.open(EditorFormComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      //refresh grid
    });
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(FileUploadDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      //refresh grid
    });
  }
}
