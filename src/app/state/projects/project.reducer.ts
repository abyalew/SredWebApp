import {Project} from '../../models/project';
import {createReducer, on} from '@ngrx/store';
import {
  addProject,
  addProjectFailure,
  addProjectSuccess, closeEditForm,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess, openEditForm,
} from './project.actions';

export interface ProjectState {
  projects: Project[];
  error: string | null;
  loadStatus: 'pending' | 'loading' | 'error' | 'success';
  saveStatus: 'pending' | 'loading' | 'error' | 'success';
  editorFormStatus: 'opened' | 'closed';
  projectOnEdit: Project | null;
}

const initialState: ProjectState = {
  projects: [],
  error: null,
  loadStatus: 'pending',
  saveStatus: 'loading',
  editorFormStatus: 'closed',
  projectOnEdit: null,
}

export const projectReducer = createReducer(
  initialState,
  on(loadProjects, (state): ProjectState => ({...state, loadStatus: 'loading' })),
  on(loadProjectsSuccess, (state, { projects }): ProjectState => ({
    ...state, projects, error: null, loadStatus: 'success' })),
  on(loadProjectsFailure, (state, { error }): ProjectState => ({
    ...state, error: error, loadStatus: 'error' })),
  on(openEditForm, (state, { project }): ProjectState => ({
    ...state, editorFormStatus: 'opened', projectOnEdit: project })),
  on(closeEditForm, (state): ProjectState => ({
    ...state, editorFormStatus: 'closed' })),
  on(addProject, (state, content): ProjectState => ({
    ...state, saveStatus: 'loading' })),
  on(addProjectSuccess, (state, content): ProjectState => ({
    ...state, saveStatus: 'success', })),
  on(addProjectFailure, (state, content): ProjectState => ({
    ...state, saveStatus: 'error', })),
)


