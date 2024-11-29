import {Component, EventEmitter, inject, Input, Output, model} from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {Project} from '../../../models/project';
import {Store} from '@ngrx/store';
import {selectProjectOnEdit} from '../../../state/projects/project.selector';
import {AppState} from '../../../state/app.state';
import {addProject, closeEditForm} from '../../../state/projects/project.actions';

@Component({
  selector: 'project-editor-form',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './editor-form.component.html',
  styleUrl: './editor-form.component.scss'
})
export class EditorFormComponent {
  @Output() submitted = new EventEmitter();

  constructor(private store: Store<AppState>) {
    this.store.select(selectProjectOnEdit).subscribe(project => {
      this.editMode = true;
      this.projectOnEdit = project;

      this.projectForm = this.formBuilder.group({
        name: [ project?.name || '' , Validators.required ],
        description: [ project?.description || '', Validators.required ],
        integration: [ project?.integrationOf || '', Validators.required ],
        isIncluded: [ project?.isIncluded ]
      });
    })
  }

  projectOnEdit: Project | null  = null;
  editMode: boolean = false;

  formBuilder = inject(FormBuilder);

  projectForm: FormGroup = this.formBuilder.group({
    name: ['' , Validators.required],
    description: ['', Validators.required],
    integration: ['', Validators.required],
    isIncluded: [ false ]
  });

  get name(){
    return this.projectForm.get('name');
  }
  get description(){
    return this.projectForm.get('description');
  }
  get integration(){
    return this.projectForm.get('integration');
  }

  submit() {
    if(!this.projectForm.valid){
      return;
    }
    this.store.dispatch(addProject({...this.projectForm.value, id: this.projectOnEdit?.id}));
  }

  cancel() {
    this.store.dispatch(closeEditForm());
  }
}
