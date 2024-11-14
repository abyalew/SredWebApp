import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RefreshEventService } from '../../../services/refreshEvent.service';


@Component({
  selector: 'sred-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.css',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, MatInputModule, ReactiveFormsModule, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SredDateRangePicker {
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  timeout: any;
  constructor(private refreshEventService: RefreshEventService){

  }
  onChange(){
    if(this.timeout)
      clearTimeout(this.timeout);
    if(this.range.controls.start.value && this.range.controls.end.value){
      this.timeout = setTimeout(() => {
        this.refreshEventService.triggerRefresh({dateFrom: this.range.controls.start.value ?? undefined, dateTo: this.range.controls.end.value ?? undefined})
      }, 2000);
    }
  }
}