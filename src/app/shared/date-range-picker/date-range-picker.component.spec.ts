import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SredDateRangePicker } from './date-range-picker.component';

describe('DateRangePickerComponent', () => {
  let component: SredDateRangePicker;
  let fixture: ComponentFixture<SredDateRangePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SredDateRangePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SredDateRangePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
