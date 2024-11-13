import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppToolbarIconComponent } from './app-toolbar-icon.component';

describe('AppToolbarIconComponent', () => {
  let component: AppToolbarIconComponent;
  let fixture: ComponentFixture<AppToolbarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppToolbarIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppToolbarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
