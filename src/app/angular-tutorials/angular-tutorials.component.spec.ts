import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTutorialsComponent } from './angular-tutorials.component';

describe('AngularTutorialsComponent', () => {
  let component: AngularTutorialsComponent;
  let fixture: ComponentFixture<AngularTutorialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularTutorialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
