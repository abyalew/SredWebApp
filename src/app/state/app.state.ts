import {ProjectState} from './projects/project.reducer';
import {FiscalPeriodState} from './fiscalPeriod/fiscalPeriod.reducer';

export interface AppState {
  projects: ProjectState;
  fiscalPeriods: FiscalPeriodState;
}
