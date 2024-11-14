import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


export interface TimesheetData {
  title: string,
  value: number,
  status: number,
  percentage: number
}
@Component({
  selector: 'timesheet-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './timesheet-card.component.html',
  styleUrl: './timesheet-card.component.css'
})
export class TimesheetCardComponent {
  @Input() data : TimesheetData  = {
    title: "",
    value: 0,
    status: -1,
    percentage: 0
  };
}
