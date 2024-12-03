import {Project} from '../../models/project';
import {createAction, props} from '@ngrx/store';
import {GridFilter} from '../../shared/grid-filter/grid-filter.component';

export const loadProjects = createAction('[Project Page] Load Projects', props<{ filters: GridFilter | undefined }>());
export const loadProjectsSuccess = createAction('[Project Page] Load Projects Success', props<{ projects: Project[] }>());
export const loadProjectsFailure = createAction('[Project Page] Load Projects Failure', props<{ error: string }>());
export const openEditForm = createAction('[Project Page] Open Edit Form',props<{ project : Project | null }>());
export const closeEditForm = createAction('[Project Page] Close Edit Form');
export const addProject = createAction('[Project Page] Add Project',props<Project>());
export const addProjectSuccess = createAction('[Project Page] Add Project Success',props<Project>());
export const addProjectFailure = createAction('[Project Page] Add Project Failure',props<{ error: string }>());
export const bulkSave = createAction('[Project Page] Bulk Save',props<{ projects: Project[] }>());
export const bulkSaveSuccess = createAction('[Project Page] Bulk Save Success',props<{ projects: Project[] }>());
