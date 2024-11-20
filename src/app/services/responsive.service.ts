import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  breakPointObserver: BreakpointObserver = inject(BreakpointObserver);
  screenWidth = toSignal(this.breakPointObserver.observe([ Breakpoints.XSmall, Breakpoints.Small ,Breakpoints.Medium ]));

  extraSmallWidth = computed(() => this.screenWidth()?.breakpoints[Breakpoints.XSmall]);
  smallWidth = computed(() => this.screenWidth()?.breakpoints[Breakpoints.Small]);
  mediumWidth = computed(() => this.screenWidth()?.breakpoints[Breakpoints.Medium]);
}