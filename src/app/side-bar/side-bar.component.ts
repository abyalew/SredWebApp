import { Component, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterOutlet } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SredDateRangePicker } from '../shared/date-range-picker/date-range-picker.component';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { AppToolbarIconComponent } from '../shared/app-toolbar-icon/app-toolbar-icon.component';
import { SearchInputComponent } from '../shared/search-input/search-input.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, SredDateRangePicker, MatBadgeModule,
    MatDividerModule, MatListModule, MatSlideToggleModule, UserProfileComponent, AppToolbarIconComponent, SearchInputComponent, MatCardModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  
  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIcon('panel-close', sanitizer.bypassSecurityTrustResourceUrl('/panel-close.svg'));
  }

}
