import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SredSummaryComponent } from './sred-summary.component';

describe('SredSummaryComponent', () => {
  let component: SredSummaryComponent;
  let fixture: ComponentFixture<SredSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SredSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SredSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
