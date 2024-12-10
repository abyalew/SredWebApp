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
  selectProjectPage,
  selectEditorStatus,
  selectProjectLoadingStatus, selectProjectSaveStatus,
  selectUploadStatus, selectProjectDeleteStatus, selectConfirmationDialogStatus
} from '../../state/projects/project.selector';
import { closeEditForm, loadProjectPage, openEditForm } from '../../state/projects/project.actions';
import {Subscription} from 'rxjs';
import {FilterField, GridFilter, GridFilterComponent} from '../../shared/grid-filter/grid-filter.component';
import {DatePipe, NgIf} from '@angular/common';
import {selectCurrentFiscalPeriod} from '../../state/fiscalPeriod/fiscalPeriod.selector';
import {FiscalPeriod} from '../../models/fiscalPeriod';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Page, PageParam} from '../../services/project.service';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, AgGridAngular, GridFilterComponent, NgIf, DatePipe, MatPaginatorModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  editorDialog: MatDialogRef<EditorFormComponent> | null = null;
  confirmationDialog: MatDialogRef<ConfirmationDialogComponent> | null = null;
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
        onDelete: (params: any) => this.deleteRow(params)
      },
      width: 90,
      maxWidth: 115,
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
  filters: GridFilter | undefined = undefined;
  defaultColDef: ColDef = {
    flex: 1,
  };

  rowData: Project[] = [];
  private allProjectsSelectoSub: Subscription;
  private editorStatusSub: Subscription;
  private loadingStatusSub: Subscription;
  private saveStatusSub: Subscription;
  private uploadStatusSub: Subscription | undefined;
  selectCurrentFiscalPeriodSub: Subscription;
  currentFiscalPeriod: FiscalPeriod | null = null;
  pagination: PageParam = {
    pageSize: 10,
    currentPage: 1
  };
  pageData: Page<Project> = {
    list: [],
    currentPage: 1,
    pageSize: 10,
    totalPages: 100
  };
  totalPages: number = 0;
  private selectConfirmationDialogStatusSub: Subscription;
  constructor(private store: Store<AppState>) {
    this.allProjectsSelectoSub = this.store.select(selectProjectPage).subscribe(data => {
      this.rowData = data.list;
      this.pageData = data;
      this.totalPages = data.totalPages;
    });

    this.editorStatusSub = this.store.select(selectEditorStatus).subscribe(editorStatus => {
      if(editorStatus === 'opened') {
        this.openEditorDialog();
      }
      if (editorStatus === 'closed') {
        this.loadProjects(this.filters, this.pagination);
        this.closeEditorDialog();
      }
    });

    this.loadingStatusSub = this.store.select(selectProjectLoadingStatus).subscribe(loadStatus => {
        this.gridLoading = loadStatus === 'loading';
    })

    this.saveStatusSub = this.store.select(selectProjectSaveStatus).subscribe(saveState => {
      if(saveState.status === 'success') {
        this.store.dispatch(closeEditForm());
      }
    });

    this.selectCurrentFiscalPeriodSub = this.store.select(selectCurrentFiscalPeriod).subscribe(fiscalPeriod => {
      if(this.currentFiscalPeriod != null){
        this.loadProjects(this.filters, this.pagination);
      }
      this.currentFiscalPeriod = fiscalPeriod;
    });

    this.selectConfirmationDialogStatusSub = this.store.select(selectConfirmationDialogStatus).subscribe(editorStatus => {
      console.log(editorStatus);
      if (editorStatus === 'closed') {
        this.loadProjects(this.filters, this.pagination);
        this.closeConfirmationDialog();
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.editorStatusSub.unsubscribe();
    this.allProjectsSelectoSub.unsubscribe();
    this.loadingStatusSub.unsubscribe();
    this.saveStatusSub.unsubscribe();
    this.selectCurrentFiscalPeriodSub.unsubscribe();
    this.selectConfirmationDialogStatusSub.unsubscribe();
    if(!this.uploadStatusSub?.closed)
      this.uploadStatusSub?.unsubscribe();
  }

  onCreate(){
    this.store.dispatch(openEditForm({ project: null }));
  }

  loadProjects(filters: GridFilter | undefined, pagination: PageParam): void {
    if(filters)
      this.filters = filters;
    if(this.currentFiscalPeriod){
      this.store.dispatch(loadProjectPage({ filters: this.filters, pagination:  pagination}));
    }
  }

  openEditorDialog(project: Project | null = null) {
    this.editorDialog = this.dialog.open(EditorFormComponent, { data: project , disableClose: true });
  }

  closeEditorDialog() {
    if(this.editorDialog)
      this.editorDialog.close();
  }

  openConfirmationDialog(config: any) {
    this.confirmationDialog = this.dialog.open(ConfirmationDialogComponent, config);
  }

  closeConfirmationDialog()
  {
    console.log('close confirmation dialog: ', this.confirmationDialog);
    if(this.confirmationDialog)
      this.confirmationDialog!.close();
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(FileUploadDialogComponent);
    this.uploadStatusSub = this.store.select(selectUploadStatus).subscribe(status => {
      if(status === 'success') {
        dialogRef.close();
        this.uploadStatusSub?.unsubscribe();
        this.loadProjects(this.filters, this.pagination);
      }
    })
  }

  onGridReady(event: GridReadyEvent): void {
    this.loadProjects(this.filters, this.pagination);
    event.api.sizeColumnsToFit();
  }

  editRow(data: any) {
    this.store.dispatch(openEditForm({project: data}));
  }

  deleteRow(data: any) {
    const config = { data };
    this.openConfirmationDialog(config);
  }

  toggleGridFilter() {
    this.showGridFilter = !this.showGridFilter;
    if(!this.showGridFilter)
      this.loadProjects(this.filters, this.pagination);
  }

  onPaginationChanged(event: any) {
    this.pagination = { pageSize: event.pageSize, currentPage: ++event.pageIndex };
    this.loadProjects(this.filters, this.pagination);
  }
}
