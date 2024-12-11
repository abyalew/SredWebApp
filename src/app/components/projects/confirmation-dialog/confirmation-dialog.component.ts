import {Component, EventEmitter, inject, Output, OnDestroy, model} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {Project} from '../../../models/project';
import {Action, Store} from '@ngrx/store';
import { selectProjectDeleteStatus } from '../../../state/projects/project.selector';
import {AppState} from '../../../state/app.state';
import {closeConfirmationDialog} from '../../../state/projects/project.actions';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Subscription} from 'rxjs';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent implements OnDestroy {
  @Output() submitted = new EventEmitter();
  loading: boolean = false;
  saveStatus: { status: 'pending' | 'loading' | 'error' | 'success', error: string | null } | null = null;
  private deleteStatusSubscription: Subscription | undefined;
  readonly data = inject(MAT_DIALOG_DATA);
  readonly project = model(this.data.data);
  readonly title = model(this.data.title);
  readonly message = model(this.data.message);
  readonly action = model(this.data.action);


  constructor(private store: Store<AppState>) {
    this.deleteStatusSubscription = this.store.select(selectProjectDeleteStatus).subscribe(saveState => {
      this.saveStatus = {...saveState };
      console.log(saveState.status);
      switch(saveState.status) {
        case 'success':
          this.loading = false;
          console.log('close confirmation action triggered.');
          this.store.dispatch(closeConfirmationDialog());
          return;
        case 'loading':
          this.loading = true;
          return;
        case 'error':
          this.loading = false;
          return;
        default:
          this.loading = false;
          return;
      }
    });
  }

  ngOnDestroy() {
    this.deleteStatusSubscription?.unsubscribe();
  }

  submit() {
    this.store.dispatch(this.action());
  }
}
