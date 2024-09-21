import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature3Component } from './feature3.component';

describe('Feature3Component', () => {
  let component: Feature3Component;
  let fixture: ComponentFixture<Feature3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Feature3Component],
    });
    fixture = TestBed.createComponent(Feature3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
