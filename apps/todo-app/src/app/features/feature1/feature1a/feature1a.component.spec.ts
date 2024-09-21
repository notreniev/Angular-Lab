import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature1aComponent } from './feature1a.component';

describe('Feature1aComponent', () => {
  let component: Feature1aComponent;
  let fixture: ComponentFixture<Feature1aComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feature1aComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Feature1aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
