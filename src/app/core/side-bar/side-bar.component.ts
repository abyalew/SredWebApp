import {Component, computed, inject, OnDestroy, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
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
import { CommonModule } from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {loadFiscalPeriods, setCurrentFiscalPeriod} from '../../state/fiscalPeriod/fiscalPeriod.actions';
import {selectAllFiscalPeriods, selectCurrentFiscalPeriod} from '../../state/fiscalPeriod/fiscalPeriod.selector';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {FiscalPeriod} from '../../models/fiscalPeriod';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    SredDateRangePicker,
    MatBadgeModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    UserProfileComponent,
    AppToolbarIconComponent,
    SearchInputComponent,
    MatCardModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatOption,
    MatSelect,
    FormsModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit, OnDestroy {

  responsiveService: ResponsiveService = inject(ResponsiveService);
  fiscalPeriods: FiscalPeriod[] = [];
  fiscalPeriodOpts: { key: number | null | undefined; value: string }[] | null = null;
  selectedFiscalPeriodId: number | null | undefined = null;
  selectAllFiscalPeriodsSub: Subscription | null = null;
  selectCurrentFiscalPeriodSub: Subscription | null = null;
  sideNavMode = computed(()=>{
    if(this.responsiveService.mediumWidth() ||
    this.responsiveService.smallWidth() ||
    this.responsiveService.extraSmallWidth())
      return 'over';
    return 'side';
  });

  isSmallViewPort = computed(()=> {
    return this.responsiveService.smallWidth() || this.responsiveService.extraSmallWidth();
  });
  showSearchInput: boolean = false;
  showDateRangePicker: boolean = false;
  constructor(private store: Store<AppState>) {
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
    iconRegistry.addSvgIcon('mail_outlined', sanitizer.bypassSecurityTrustResourceUrl('/mail_outlined.svg'));
    iconRegistry.addSvgIcon('notifications_outlined', sanitizer.bypassSecurityTrustResourceUrl('/notifications_outlined.svg'));
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('/search.svg'));

  }

  ngOnInit() {
    this.store.dispatch(loadFiscalPeriods());
    this.selectAllFiscalPeriodsSub = this.store.select(selectAllFiscalPeriods).subscribe(fiscalPeriods => {
      this.fiscalPeriods = fiscalPeriods;
      this.fiscalPeriodOpts = fiscalPeriods.map(fs => {
        return { key: fs.id, value: `${fs.startDate?.toString().split('T')[0]} - ${fs.endDate?.toString().split('T')[0]}`};
      });
      this.store.dispatch(setCurrentFiscalPeriod({ fiscalPeriod: fiscalPeriods[0] }));
    });
    this.selectCurrentFiscalPeriodSub = this.store.select(selectCurrentFiscalPeriod).subscribe(fiscalPeriod => {
      this.selectedFiscalPeriodId = fiscalPeriod?.id;
    });
  }

  ngOnDestroy() {
    this.selectAllFiscalPeriodsSub?.unsubscribe();
    this.selectCurrentFiscalPeriodSub?.unsubscribe();
  }

  onShowSearchInput() {
    this.showDateRangePicker = false;
    this.showSearchInput = !this.showSearchInput;
  }

  onShowDateRangePicker() {
    this.showSearchInput = false;
    this.showDateRangePicker = !this.showDateRangePicker;
  }

  fiscalPeriodChanged(){
    const fp = this.fiscalPeriods.find(fp=>fp.id === this.selectedFiscalPeriodId);
    if(fp)
      this.store.dispatch(setCurrentFiscalPeriod({ fiscalPeriod: fp }));
  }
}
