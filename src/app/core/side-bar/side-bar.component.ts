import { Component, computed, inject } from '@angular/core';
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

import { SredDateRangePicker } from '../../shared/date-range-picker/date-range-picker.component';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { AppToolbarIconComponent } from '../../shared/app-toolbar-icon/app-toolbar-icon.component';
import { SearchInputComponent } from '../../shared/search-input/search-input.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, SredDateRangePicker, MatBadgeModule,
    MatDividerModule, MatListModule, MatSlideToggleModule, UserProfileComponent, AppToolbarIconComponent, SearchInputComponent, MatCardModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  responsiveService: ResponsiveService = inject(ResponsiveService);
  sideNavMode = computed(()=>{
    if(this.responsiveService.mediumWidth())
      return 'over';
    return 'side';
  });
  
  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIcon('panel-close', sanitizer.bypassSecurityTrustResourceUrl('/panel-close.svg'));
    iconRegistry.addSvgIcon('help', sanitizer.bypassSecurityTrustResourceUrl('/help.svg'));
    iconRegistry.addSvgIcon('home_outlined', sanitizer.bypassSecurityTrustResourceUrl('/home_outlined.svg'));
    iconRegistry.addSvgIcon('line_chart', sanitizer.bypassSecurityTrustResourceUrl('/line_chart.svg'));
    iconRegistry.addSvgIcon('setting', sanitizer.bypassSecurityTrustResourceUrl('/setting.svg'));
    iconRegistry.addSvgIcon('store_outlined', sanitizer.bypassSecurityTrustResourceUrl('/store_outlined.svg'));
    iconRegistry.addSvgIcon('user_group_outlined', sanitizer.bypassSecurityTrustResourceUrl('/user_group_outlined.svg'));
    iconRegistry.addSvgIcon('dark_mode_outlined', sanitizer.bypassSecurityTrustResourceUrl('/dark_mode_outlined.svg'));
    iconRegistry.addSvgIcon('paper', sanitizer.bypassSecurityTrustResourceUrl('/paper.svg'));

  }

}
