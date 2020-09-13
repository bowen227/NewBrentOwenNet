import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldGraphComponent } from './world-graph.component';

describe('WorldGraphComponent', () => {
  let component: WorldGraphComponent;
  let fixture: ComponentFixture<WorldGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
