import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmAppComponent } from './crm-app.component';

describe('CrmAppComponent', () => {
  let component: CrmAppComponent;
  let fixture: ComponentFixture<CrmAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
