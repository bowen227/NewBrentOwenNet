import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbsScoresComponent } from './fbs-scores.component';

describe('FbsScoresComponent', () => {
  let component: FbsScoresComponent;
  let fixture: ComponentFixture<FbsScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbsScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbsScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
