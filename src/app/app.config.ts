import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {projectReducer} from './state/projects/project.reducer';
import {ProjectEffects} from './state/projects/project.effects';
import {fiscalPeriodReducer} from './state/fiscalPeriod/fiscalPeriod.reducer';
import {FiscalPeriodEffects} from './state/fiscalPeriod/fiscalPeriod.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    { eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({ projects: projectReducer, fiscalPeriods: fiscalPeriodReducer }),
    provideEffects(ProjectEffects, FiscalPeriodEffects)]
};
