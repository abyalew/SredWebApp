import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterOutlet } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';

import { SredDateRangePicker } from '../shared/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, SredDateRangePicker, MatBadgeModule, MatDividerModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

}
