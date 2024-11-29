import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProjectService} from '../../services/project.service';
import {
  addProject,
  addProjectFailure,
  addProjectSuccess, closeEditForm,
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
      switchMap(() =>
        this.projectService.getAllProjects().pipe(
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
          map(() => closeEditForm()),
          catchError(error => of(addProjectFailure({error})))
        )
      )
    )
  )


}
