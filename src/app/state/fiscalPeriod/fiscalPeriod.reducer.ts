import {createReducer, on} from '@ngrx/store';
import {
  loadFiscalPeriods,
  loadFiscalPeriodsFailure,
  loadFiscalPeriodsSuccess,
  setCurrentFiscalPeriod
} from './fiscalPeriod.actions';
import {FiscalPeriod} from '../../models/fiscalPeriod';

export interface FiscalPeriodState {
  fiscalPeriods: FiscalPeriod[];
  currentFiscalPeriod: FiscalPeriod | null;
  error: string | null;
  loadStatus: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: FiscalPeriodState = {
  fiscalPeriods: [],
  currentFiscalPeriod: null,
  error: null,
  loadStatus: 'pending'
}

export const fiscalPeriodReducer = createReducer(
  initialState,
  on(loadFiscalPeriods, (state): FiscalPeriodState => ({...state, loadStatus: 'loading' })),
  on(loadFiscalPeriodsSuccess, (state, { fiscalPeriods }): FiscalPeriodState => ({
    ...state, fiscalPeriods, currentFiscalPeriod: fiscalPeriods[0], error: null, loadStatus: 'success' })),
  on(loadFiscalPeriodsFailure, (state, { error }): FiscalPeriodState => ({
    ...state, error: error, loadStatus: 'error' })),
  on(setCurrentFiscalPeriod, (state, { fiscalPeriod }): FiscalPeriodState => ({...state, currentFiscalPeriod: fiscalPeriod })),
)


