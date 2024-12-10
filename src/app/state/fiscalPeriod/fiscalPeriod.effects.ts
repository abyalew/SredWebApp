import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  loadFiscalPeriods, loadFiscalPeriodsFailure, loadFiscalPeriodsSuccess
} from './fiscalPeriod.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {FiscalPeriodService} from '../../services/fiscalPeriod.service';

@Injectable()
export class FiscalPeriodEffects {

  actions$ = inject(Actions);
  constructor(private store: Store<AppState>, private fiscalPeriodService: FiscalPeriodService) {}

  loadFiscalPeriods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFiscalPeriods),
      switchMap(() =>
        this.fiscalPeriodService.getAll().pipe(
          map(fiscalPeriods => loadFiscalPeriodsSuccess({ fiscalPeriods })),
          catchError(error => of(loadFiscalPeriodsFailure({error})))
        )
      )
    )
  )
}
