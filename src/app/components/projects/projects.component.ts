import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Project } from '../../models/project';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { FileUploadDialogComponent } from '../../shared/file-upload-dialog/file-upload-dialog.component';
import {EditActionRendererComponent} from './edit-action-renderer/edit-action-renderer.component';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, AgGridAngular],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly dialog = inject(MatDialog);
  dialogConfig: MatDialogConfig = {
    disableClose: true,
  }
  colDefs: ColDef[] = [
    { field: 'name'},
    { field: 'description' },
    { field: 'integrationOf' },
    { field: 'timeRecords' },
    { field: 'totalHours' },
    { field: 'createdBy' },
    { field: 'createdOn' },
    { field: 'isIncluded' },
    { field: 'Action', cellRenderer: EditActionRendererComponent,
      cellRendererParams: {
        onEdit: (params: any) => this.editRow(params),
      },
      width: 50,
      maxWidth: 100,
      suppressSizeToFit: true
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  rowData: Project[] = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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

    dialogRef.componentInstance.submitted.subscribe((newProject) =>{
      console.log('Submitted', newProject);
    });

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

  editRow(data: any) {
    this.dialog.open(EditorFormComponent, { data, disableClose: true });
  }
}
