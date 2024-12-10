import {Project} from '../../models/project';
import {createAction, props} from '@ngrx/store';
import {GridFilter} from '../../shared/grid-filter/grid-filter.component';
import {Page, PageParam} from '../../services/project.service';

export const loadProjects = createAction('[Project Page] Load Projects', props<{ filters: GridFilter | undefined }>());
export const loadProjectsSuccess = createAction('[Project Page] Load Projects Success', props<{ projects: Project[] }>());
export const loadProjectsFailure = createAction('[Project Page] Load Projects Failure', props<{ error: string }>());

export const loadProjectPage = createAction('[Project Page] Load Page', props<{ pagination: PageParam, filters: GridFilter | undefined }>());
export const loadProjectPageSuccess = createAction('[Project Page] Load Page Success', props<{ projects: Page<Project> }>());
export const loadProjectPageFailure = createAction('[Project Page] Load Page Failure', props<{ error: string }>());

export const openEditForm = createAction('[Project Page] Open Edit Form',props<{ project : Project | null }>());
export const closeEditForm = createAction('[Project Page] Close Edit Form');
export const closeConfirmationDialog = createAction('[Project Page] Close Confirmation Dialog');
export const deleteProject = createAction('[Project Page] Delete Project', props<{ project : Project | null }>());
export const deleteProjectSuccess = createAction('[Project Page] Delete Project Success', props<{ success: boolean }>());
export const deleteProjectFailure = createAction('[Project Page] Delete Project Failure', props<{ error: string }>());
export const addProject = createAction('[Project Page] Add Project',props<Project>());
export const addProjectSuccess = createAction('[Project Page] Add Project Success',props<Project>());
export const addProjectFailure = createAction('[Project Page] Add Project Failure',props<{ error: string }>());
export const bulkSave = createAction('[Project Page] Bulk Save',props<{ projects: Project[] }>());
export const bulkSaveSuccess = createAction('[Project Page] Bulk Save Success',props<{ projects: Project[] }>());
