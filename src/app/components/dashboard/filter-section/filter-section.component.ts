import { Component, EventEmitter, Output } from '@angular/core';
import { SearchInputComponent } from '../../../shared/search-input/search-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dashboard-filter-section',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, SearchInputComponent],
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.scss'
})
export class FilterSectionComponent {
  @Output() searchValueChanged = new EventEmitter<string>();

  onSearchChanged(value: string){
    this.searchValueChanged.emit(value);
  }
}
