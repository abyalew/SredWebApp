import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Output() changed = new EventEmitter<string>();

  responsiveService: ResponsiveService = inject(ResponsiveService);
  minimal = computed(()=> {
    return this.responsiveService.smallWidth() || this.responsiveService.extraSmallWidth();
  });
  
  searchValue: string | undefined;

  onChange(){
    this.changed.emit(this.searchValue);
  }
}
