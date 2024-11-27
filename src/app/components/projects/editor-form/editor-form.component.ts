import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'project-editor-form',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule], 
  templateUrl: './editor-form.component.html',
  styleUrl: './editor-form.component.scss'
})
export class EditorFormComponent {
  @Input() editMode: boolean = false;
  name = new FormControl('');
}
