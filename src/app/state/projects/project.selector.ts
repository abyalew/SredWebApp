import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';
import {ProjectState} from './project.reducer';

export const selectProjectsState = (state: AppState) => state.projects;
export const selectAllProjects = createSelector(
  selectProjectsState,
  (state: ProjectState) => state.projects
);

export const selectEditorStatus = createSelector(
  selectProjectsState,
  (state: ProjectState) => state.editorFormStatus
);

export const selectProjectOnEdit = createSelector(
  selectProjectsState,
  (state: ProjectState) => state.projectOnEdit
);

export const selectUploadStatus = createSelector(
  selectProjectsState,
  (state: ProjectState) => state.uploadStatus
);

export const selectProjectLoadingStatus = createSelector(
  selectProjectsState,
  (state: ProjectState) => state.loadStatus
);

export const selectProjectSaveStatus = createSelector(
  selectProjectsState,
  (state: ProjectState) => state.saveStatus
);
