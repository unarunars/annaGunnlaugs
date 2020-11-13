import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCVComponent } from './change-cv.component';

describe('ChangeCVComponent', () => {
  let component: ChangeCVComponent;
  let fixture: ComponentFixture<ChangeCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
