import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Project } from '../../models/project';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { FileUploadDialogComponent } from '../../shared/file-upload-dialog/file-upload-dialog.component';
import {EditActionRendererComponent} from './edit-action-renderer/edit-action-renderer.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {
  selectAllProjects,
  selectEditorStatus,
  selectProjectLoadingStatus, selectProjectSaveStatus,
  selectUploadStatus
} from '../../state/projects/project.selector';
import {closeEditForm, loadProjects, openEditForm} from '../../state/projects/project.actions';
import {Subscription} from 'rxjs';
import {FilterField, GridFilter, GridFilterComponent} from '../../shared/grid-filter/grid-filter.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, AgGridAngular, GridFilterComponent, NgIf],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  editorDialog: MatDialogRef<EditorFormComponent> | null = null;
  gridLoading: boolean = false;
  showGridFilter: boolean = false;
  colDefs: ColDef[] = [
    { field: 'name', maxWidth: 160},
    { field: 'description' },
    { field: 'integrationOf' },
    { field: 'timeRecords' },
    { field: 'totalHours' },
    { field: 'createdBy', maxWidth: 160 },
    { field: 'createdOn', maxWidth: 160, valueFormatter: (v) => v.value.toString().split('T')[0] },
    { field: 'isIncluded', maxWidth: 160 },
    { field: 'Action', cellRenderer: EditActionRendererComponent,
      cellRendererParams: {
        onEdit: (params: any) => this.editRow(params),
      },
      width: 50,
      maxWidth: 100,
      suppressSizeToFit: true
    },
  ];
  fieldFilterOptions: FilterField[] = [
    new FilterField('name','Name',"text"),
    new FilterField('description', 'Description', "text"),
    new FilterField('integrationOf', 'Integration Of', "text"),
    new FilterField('timeRecords', 'TimeRecords', "number"),
    new FilterField('totalHours', 'Total Hours', "number"),
    new FilterField('createdBy', 'Created By', "text"),
    new FilterField('createdOn', 'Created On', "date"),
    new FilterField('isIncluded', 'Is included', "boolean")
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  rowData: Project[] = [];
  private allProjectsSelectoSub: Subscription;
  private editorStatusSub: Subscription;
  private loadingStatusSub: Subscription;
  private saveStatusSub: Subscription;
  private uploadStatusSub: Subscription | undefined;

  constructor(private store: Store<AppState>) {
    this.allProjectsSelectoSub = this.store.select(selectAllProjects).subscribe(projects => {
      this.rowData = projects;
    });

    this.editorStatusSub = this.store.select(selectEditorStatus).subscribe(editorStatus => {
      if(editorStatus === 'opened') {
        this.openEditorDialog();
      }
      if (editorStatus === 'closed') {
        this.loadProjects(undefined);
        this.closeEditorDialog();
      }
    });

    this.loadingStatusSub = this.store.select(selectProjectLoadingStatus).subscribe(loadStatus => {
        this.gridLoading = loadStatus === 'loading';
    })

    this.saveStatusSub = this.store.select(selectProjectSaveStatus).subscribe(saveState => {
      if(saveState === 'success') {
        this.store.dispatch(closeEditForm());
      }
    });
  }

  ngOnInit() {
    this.loadProjects(undefined);
  }

  ngOnDestroy() {
    this.editorStatusSub.unsubscribe();
    this.allProjectsSelectoSub.unsubscribe();
    this.loadingStatusSub.unsubscribe();
    this.saveStatusSub.unsubscribe();
    if(!this.uploadStatusSub?.closed)
      this.uploadStatusSub?.unsubscribe();
  }

  onCreate(){
    this.store.dispatch(openEditForm({ project: null }));
  }

  loadProjects(filters: GridFilter | undefined): void {
    this.store.dispatch(loadProjects({ filters: filters }));
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
    this.uploadStatusSub = this.store.select(selectUploadStatus).subscribe(status => {
      if(status === 'success') {
        dialogRef.close();
        this.uploadStatusSub?.unsubscribe();
        this.loadProjects(undefined);
      }
    })
  }

  onGridReady(event: GridReadyEvent): void {
    event.api.sizeColumnsToFit();
  }

  editRow(data: any) {
    console.log("edit triggered");
    this.store.dispatch(openEditForm({project: data}));
  }

  toggleGridFilter() {
    this.showGridFilter = !this.showGridFilter;
    if(!this.showGridFilter)
      this.loadProjects(undefined);
  }
}
