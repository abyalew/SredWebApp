import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProjectService} from '../../services/project.service';
import {
  addProject,
  addProjectFailure, addProjectSuccess,
  bulkSave, closeEditForm,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess
} from './project.actions';
import {catchError, map, of, switchMap, pipe} from 'rxjs';

@Injectable()
export class ProjectEffects {

  actions$ = inject(Actions);
  constructor(private store: Store<AppState>, private projectService: ProjectService) {}

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

  saveProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProject),
      switchMap(project =>
        this.projectService.saveProject(project).pipe(
          map(() => addProjectSuccess(project)),
          catchError(error => of(addProjectFailure({error})))
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


}
