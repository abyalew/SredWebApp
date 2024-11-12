import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallHoursComponent } from './overall-hours.component';

describe('OverallHoursComponent', () => {
  let component: OverallHoursComponent;
  let fixture: ComponentFixture<OverallHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallHoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
