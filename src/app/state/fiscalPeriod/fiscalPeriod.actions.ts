import {createAction, props} from '@ngrx/store';
import {GridFilter} from '../../shared/grid-filter/grid-filter.component';
import {FiscalPeriod} from '../../models/fiscalPeriod';

export const loadFiscalPeriods = createAction('[Project Page] Load Fiscal Periods');
export const loadFiscalPeriodsSuccess = createAction('[Project Page] Load Fiscal Periods Success', props<{ fiscalPeriods: FiscalPeriod[] }>());
export const loadFiscalPeriodsFailure = createAction('[Project Page] Load Fiscal Periods Failure', props<{ error: string }>());
export const setCurrentFiscalPeriod = createAction('[Project Page] Set Current Fiscal Period', props<{ fiscalPeriod: FiscalPeriod }>());
