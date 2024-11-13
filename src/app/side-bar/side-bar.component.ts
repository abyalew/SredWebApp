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
import {MatListModule} from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SredDateRangePicker } from '../shared/date-range-picker/date-range-picker.component';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { AppToolbarIconComponent } from '../shared/app-toolbar-icon/app-toolbar-icon.component';
import { SearchInputComponent } from '../shared/search-input/search-input.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, SredDateRangePicker, MatBadgeModule,
    MatDividerModule, MatListModule, MatSlideToggleModule, UserProfileComponent, AppToolbarIconComponent, SearchInputComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

}
