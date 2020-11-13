import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePaintingsComponent } from './change-paintings.component';

describe('ChangePaintingsComponent', () => {
  let component: ChangePaintingsComponent;
  let fixture: ComponentFixture<ChangePaintingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePaintingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePaintingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
