import {Component, inject, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Project } from '../../models/project';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { FileUploadDialogComponent } from '../../shared/file-upload-dialog/file-upload-dialog.component';
import {EditActionRendererComponent} from './edit-action-renderer/edit-action-renderer.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {selectAllProjects, selectEditorStatus} from '../../state/projects/project.selector';
import {addProject, loadProjects, openEditForm} from '../../state/projects/project.actions';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, AgGridAngular],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  editorDialog: MatDialogRef<EditorFormComponent> | null = null;

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

  rowData: Project[] = [];

  constructor(private store: Store<AppState>) {
    this.store.select(selectAllProjects).subscribe(projects => {
      this.rowData = projects;
    })
    this.store.select(selectEditorStatus).subscribe(editorStatus => {
      if(editorStatus === 'opened') {
        this.openEditorDialog();
      }
      if (editorStatus === 'closed') {
        this.loadProjects();
        this.closeEditorDialog();
      }
    })
  }

  ngOnInit() {
    this.loadProjects();
  }

  onCreate(){
    this.store.dispatch(openEditForm({ project: null }));
  }

  loadProjects(): void {
    this.store.dispatch(loadProjects());
  }

  openEditorDialog(project: Project | null = null) {
    this.editorDialog = this.dialog.open(EditorFormComponent, { data: project , disableClose: true });
  }

  closeEditorDialog() {
    if(this.editorDialog)
      this.editorDialog.close();
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(FileUploadDialogComponent);
  }

  onGridReady(params: any): void {
    params.api.sizeColumnsToFit();
  }

  editRow(data: any) {
    this.store.dispatch(openEditForm({project: data}));
  }
}
