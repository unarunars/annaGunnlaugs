import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCoverComponent } from './change-cover.component';

describe('ChangeCoverComponent', () => {
  let component: ChangeCoverComponent;
  let fixture: ComponentFixture<ChangeCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
