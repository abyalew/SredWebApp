import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionRendererComponent } from './edit-action-renderer.component';

describe('EditActionRendererComponent', () => {
  let component: EditActionRendererComponent;
  let fixture: ComponentFixture<EditActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditActionRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
