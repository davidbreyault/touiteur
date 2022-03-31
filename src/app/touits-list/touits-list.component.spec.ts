import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouitsListComponent } from './touits-list.component';

describe('TouitsListComponent', () => {
  let component: TouitsListComponent;
  let fixture: ComponentFixture<TouitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouitsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
