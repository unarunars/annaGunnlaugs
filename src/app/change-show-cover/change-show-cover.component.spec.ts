import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeShowCoverComponent } from './change-show-cover.component';

describe('ChangeShowCoverComponent', () => {
  let component: ChangeShowCoverComponent;
  let fixture: ComponentFixture<ChangeShowCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeShowCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeShowCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
