import {Component, EventEmitter, inject, Output, OnDestroy} from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {Project} from '../../../models/project';
import {Store} from '@ngrx/store';
import {selectProjectOnEdit, selectProjectSaveStatus} from '../../../state/projects/project.selector';
import {AppState} from '../../../state/app.state';
import {addProject, closeEditForm} from '../../../state/projects/project.actions';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Subscription} from 'rxjs';

@Component({
  selector: 'project-editor-form',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './editor-form.component.html',
  styleUrl: './editor-form.component.scss'
})
export class EditorFormComponent implements OnDestroy {

  @Output() submitted = new EventEmitter();
  loading: boolean = false;
  private onEditSubscription: Subscription | undefined;
  private saveStatusSubscription: Subscription | undefined;

  constructor(private store: Store<AppState>) {
    this.onEditSubscription = this.store.select(selectProjectOnEdit).subscribe(project => {
      if(project) {
        this.editMode = true;
        this.projectOnEdit = project;
        this.projectForm.setValue({
          name: project?.name || '',
          description: project?.description || '',
          integrationOf: project?.integrationOf || '',
          isIncluded: !!project?.isIncluded
        });
      }
    });
    this.saveStatusSubscription = this.store.select(selectProjectSaveStatus).subscribe(saveState => {
      switch(saveState) {
        case 'success':
          this.loading = false;
          return;
        case 'loading':
          this.loading = true;
          return;
        case 'error':
          this.loading = false;
          return;
      }
    });
  }

  ngOnDestroy() {
    this.onEditSubscription?.unsubscribe();
    this.saveStatusSubscription?.unsubscribe();
  }

  projectOnEdit: Project | null  = null;
  editMode: boolean = false;

  formBuilder = inject(FormBuilder);

  projectForm: FormGroup = this.formBuilder.group({
    name: ['' , Validators.required],
    description: ['', Validators.required],
    integrationOf: ['', Validators.required],
    isIncluded: [ false ]
  });

  get name(){
    return this.projectForm?.get('name');
  }
  get description(){
    return this.projectForm?.get('description');
  }
  get integration(){
    return this.projectForm?.get('integrationOf');
  }

  submit() {
    if(this.loading || !this.projectForm?.valid){
      return;
    }
    this.store.dispatch(addProject({...this.projectForm?.value, id: this.projectOnEdit?.id}));
  }

  cancel() {
    this.store.dispatch(closeEditForm());
  }
}
