import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouitPublicationComponent } from './touit-publication.component';

describe('TouitPublicationComponent', () => {
  let component: TouitPublicationComponent;
  let fixture: ComponentFixture<TouitPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouitPublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouitPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
