import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetCardComponent } from './timesheet-card.component';

describe('TimesheetCardComponent', () => {
  let component: TimesheetCardComponent;
  let fixture: ComponentFixture<TimesheetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
