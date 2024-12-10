import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { FiscalPeriodState } from './fiscalPeriod.reducer';

export const selectFiscalPeriodsState = (state: AppState) => state.fiscalPeriods;
export const selectAllFiscalPeriods = createSelector(
  selectFiscalPeriodsState,
  (state: FiscalPeriodState) => state.fiscalPeriods,
);
export const selectCurrentFiscalPeriod = createSelector(
  selectFiscalPeriodsState,
  (state: FiscalPeriodState) => state.currentFiscalPeriod,
);

