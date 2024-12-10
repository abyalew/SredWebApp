import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule} from '@angular/forms';
import {KeyValuePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

export class FilterField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'datetime' | 'select';
  filterOptions: { key: string; value: string }[] | undefined;
  constructor(
    name: string,
    label: string,
    type: 'text' | 'number' | 'boolean' | 'date' | 'datetime' | 'select',
    filterOptions: { key: string; value: string }[] | undefined = undefined) {
    this.name = name;
    this.label = label;
    this.type = type;
    this.filterOptions = filterOptions;
  }
}

export interface GridFilter {
  filter: { [key: string] : { value: string | undefined, predicate: 'contains' | 'equals' | 'differentFrom' | undefined }} | undefined;
  sort: { field: string, isAscending: boolean } | undefined;
}

@Component({
  selector: 'grid-filter',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgIf,
    MatCheckbox,
    MatChipsModule,
    MatIconModule,
    KeyValuePipe
  ],
  templateUrl: './grid-filter.component.html',
  styleUrl: './grid-filter.component.scss'
})
export class GridFilterComponent implements OnInit {
  @Input() filterOptions: FilterField[] = [];
  @Output() changed: EventEmitter<any> = new EventEmitter();
  selectedField: FilterField | undefined;
  filter: GridFilter = { filter: {}, sort: undefined };
  filterPredicateOptions: { key: string; value: string }[] = [
    { key: 'contains', value: 'Contains' },
    { key: 'equals', value: 'Equals' },
    { key: 'differentFrom', value: 'Different From' }
  ];
  appliedFilters: { [key: string] : { value: string | undefined, predicate: 'contains' | 'equals' | 'differentFrom' | undefined  } } = {};

  ngOnInit() {
    for(let i = 0; i < this.filterOptions.length; i++) {
      this.filter.filter![this.filterOptions[i].name] = { value: '', predicate: 'contains' };
    }
  }

  updateFilter(event: any | null) {
    if(event && !event.target?.value){
      return;
    }
    this.appliedFilters = {};
    let filter: { [key: string] : { value: string | undefined, predicate: 'contains' | 'equals' | 'differentFrom' | undefined  } } = {};
    for (let key in this.filter.filter) {
      if(this.filter.filter[key].value !== undefined) {
        this.appliedFilters[key] = { ...this.filter.filter[key] };
        filter[key] = { ...this.filter.filter[key] };
      }
    }
    this.changed.emit({ filter, sort: undefined });
  }

  removeFilter(key: string) {
    this.filter.filter![key] = { value: undefined, predicate: 'contains' };
    this.updateFilter(null);
  }
}
