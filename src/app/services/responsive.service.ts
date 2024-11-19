import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
 breakPointObserver: BreakpointObserver = inject(BreakpointObserver);
 medium = '(max-width: 1280px)';
  screenWidth = toSignal(this.breakPointObserver.observe([ this.medium ]));

  mediumWidth = computed(() => this.screenWidth()?.breakpoints[this.medium]);
}