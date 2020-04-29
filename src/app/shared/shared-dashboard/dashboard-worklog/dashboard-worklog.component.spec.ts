import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWorklogComponent } from './dashboard-worklog.component';

describe('DashboardWorklogComponent', () => {
  let component: DashboardWorklogComponent;
  let fixture: ComponentFixture<DashboardWorklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWorklogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWorklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
