import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemainbarComponent } from './sidemainbar.component';

describe('SidemainbarComponent', () => {
  let component: SidemainbarComponent;
  let fixture: ComponentFixture<SidemainbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidemainbarComponent]
    });
    fixture = TestBed.createComponent(SidemainbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
