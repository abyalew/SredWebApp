import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProjectService} from '../../services/project.service';
import {
  addProject,
  addProjectFailure,
  addProjectSuccess,
  bulkSave, closeConfirmationDialog,
  closeEditForm,
  deleteProject, deleteProjectFailure,
  deleteProjectSuccess,
  loadProjectPage,
  loadProjectPageFailure,
  loadProjectPageSuccess,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess, restoreProject, restoreProjectFailure, restoreProjectSuccess
} from './project.actions';
import {catchError, map, of, switchMap, pipe} from 'rxjs';
import {selectCurrentFiscalPeriod} from '../fiscalPeriod/fiscalPeriod.selector';
import {FiscalPeriod} from '../../models/fiscalPeriod';

@Injectable()
export class ProjectEffects {

  actions$ = inject(Actions);
  currentFiscalPeriod: FiscalPeriod | null = null;
  constructor(private store: Store<AppState>, private projectService: ProjectService) {
    this.store.select(selectCurrentFiscalPeriod).subscribe(fp=>{
      if(fp)
        this.currentFiscalPeriod = { ...fp };
    })
  }

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      switchMap(({ filters }) =>
        this.projectService.getAllProjects(filters).pipe(
          map(projects => loadProjectsSuccess({ projects })),
          catchError(error => of(loadProjectsFailure({error})))
        )
      )
    )
  )

  loadProjectPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectPage),
      switchMap(({ showArchived, filters, pagination }) =>
        this.projectService.getPage(showArchived, this.currentFiscalPeriod, filters, pagination).pipe(
          map(projects => loadProjectPageSuccess({ projects })),
          catchError(error => of(loadProjectPageFailure({error})))
        )
      )
    )
  )

  saveProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProject),
      switchMap(project =>
        this.projectService.saveProject(project).pipe(
          map(() => addProjectSuccess(project)),
          catchError(error  => of(addProjectFailure({ error: 'Something went wrong. please try again.' })))
        )
      )
    )
  )

  saveProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bulkSave),
      switchMap(({ projects }) =>
        this.projectService.saveProjects(projects).pipe(
          map(() => closeEditForm()),
          catchError(error => of(addProjectFailure({error})))
        )
      )
    )
  )

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProject),
      switchMap(({ project }) =>
        this.projectService.deleteProject(project!.id as number).pipe(
          map(() => deleteProjectSuccess({ success: true })),
          catchError(error => of(deleteProjectFailure({ error: error.message })))
        )
      )
    )
  )

  restoreProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(restoreProject),
      switchMap(({ project }) =>
        this.projectService.restoreProject(project!.id as number).pipe(
          map(() => restoreProjectSuccess({ success: true })),
          catchError(error => of(restoreProjectFailure({ error: error.message })))
        )
      )
    )
  )
}
