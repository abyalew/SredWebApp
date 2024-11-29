import {Component, EventEmitter, inject, Input, Output, model} from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {Project} from '../../../models/project';

@Component({
  selector: 'project-editor-form',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './editor-form.component.html',
  styleUrl: './editor-form.component.scss'
})
export class EditorFormComponent {
  @Output() submitted = new EventEmitter();

  readonly data = inject<Project>(MAT_DIALOG_DATA);
  readonly projectId = model(this.data.id);
  readonly projectName = model(this.data.name);
  readonly projectDescription = model(this.data.description);
  readonly projectIntegration = model(this.data.integrationOf);
  readonly projectIsIncluded = model(this.data.isIncluded);

  editMode: boolean = !!this.projectId;

  formBuilder = inject(FormBuilder);

  projectForm: FormGroup = this.formBuilder.group({
    name: [this.projectName() || '' , Validators.required],
    description: [this.projectDescription() || '', Validators.required],
    integration: [this.projectIntegration() || '', Validators.required],
    isIncluded: [ this.projectIsIncluded() ]
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
      console.log("invalid form");
      return;
    }
    this.submitted.emit(this.projectForm.value);
  }
}
