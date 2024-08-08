import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstudentComponent } from './viewstudent.component';

describe('ViewstudentComponent', () => {
  let component: ViewstudentComponent;
  let fixture: ComponentFixture<ViewstudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewstudentComponent]
    });
    fixture = TestBed.createComponent(ViewstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
