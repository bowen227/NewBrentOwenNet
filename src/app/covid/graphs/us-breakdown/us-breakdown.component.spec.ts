import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsBreakdownComponent } from './us-breakdown.component';

describe('UsBreakdownComponent', () => {
  let component: UsBreakdownComponent;
  let fixture: ComponentFixture<UsBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
