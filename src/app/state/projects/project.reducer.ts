import {Project} from '../../models/project';
import {createReducer, on} from '@ngrx/store';
import {
  addProject,
  addProjectSuccess,
  bulkSave,
  bulkSaveSuccess, closeConfirmationDialog,
  closeEditForm, deleteProject, deleteProjectFailure, deleteProjectSuccess,
  loadProjectPage,
  loadProjectPageFailure,
  loadProjectPageSuccess,
  openEditForm,
} from './project.actions';
import {Page} from '../../services/project.service';

export interface ProjectState {
  page: Page<Project>;
  error: string | null;
  loadStatus: 'pending' | 'loading' | 'error' | 'success';
  saveStatus: 'pending' | 'loading' | 'error' | 'success';
  saveError: string | null;
  deleteStatus: 'pending' | 'loading' | 'error' | 'success';
  deleteError: string | null;
  confirmationDialogStatus: 'pending' | 'opened' | 'closed';
  editorFormStatus: 'pending' | 'opened' | 'closed';
  projectOnEdit: Project | null;
  uploadStatus: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: ProjectState = {
  page: { totalPages: 0, pageSize: 10, currentPage: 1, list: [] },
  error: null,
  loadStatus: 'pending',
  saveStatus: 'pending',
  saveError: null,
  deleteStatus: 'pending',
  deleteError: null,
  confirmationDialogStatus: 'pending',
  editorFormStatus: 'pending',
  projectOnEdit: null,
  uploadStatus: 'pending',
}

export const projectReducer = createReducer(
  initialState,
  on(loadProjectPage, (state): ProjectState => ({...state, loadStatus: 'loading' })),
  on(loadProjectPageSuccess, (state, { projects }): ProjectState => ({
    ...state, page: projects, error: null, loadStatus: 'success' })),
  on(loadProjectPageFailure, (state, { error }): ProjectState => ({
    ...state, error: error, loadStatus: 'error' })),
  on(openEditForm, (state, { project }): ProjectState => ({
    ...state, editorFormStatus: 'opened', projectOnEdit: project })),
  on(closeEditForm, (state): ProjectState => ({
    ...state, editorFormStatus: 'closed', saveStatus: 'pending' })),
  on(closeConfirmationDialog, (state): ProjectState => ({
    ...state, confirmationDialogStatus: 'closed', deleteStatus: 'pending' })),
  on(addProject, (state, content): ProjectState => ({
    ...state, saveStatus: 'loading' })),
  on(addProjectSuccess, (state, content): ProjectState => ({
    ...state, saveStatus: 'success', })),
  on(deleteProject, (state, content): ProjectState => ({
    ...state, deleteStatus: 'loading', })),
  on(deleteProjectSuccess, (state, content): ProjectState => ({
    ...state, deleteStatus: 'success', })),
  on(deleteProjectFailure, (state, { error }): ProjectState => ({
    ...state, deleteStatus: 'error', deleteError: error })),
  on(bulkSave, (state, content): ProjectState => ({
    ...state, uploadStatus: 'loading', })),
  on(bulkSaveSuccess, (state, content): ProjectState => ({
    ...state, uploadStatus: 'success', }))
)
