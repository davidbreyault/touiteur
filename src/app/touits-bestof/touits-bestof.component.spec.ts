import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouitsBestofComponent } from './touits-bestof.component';

describe('TouitsBestofComponent', () => {
  let component: TouitsBestofComponent;
  let fixture: ComponentFixture<TouitsBestofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouitsBestofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouitsBestofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
