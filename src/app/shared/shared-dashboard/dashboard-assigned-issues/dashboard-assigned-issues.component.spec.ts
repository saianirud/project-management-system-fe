import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAssignedIssuesComponent } from './dashboard-assigned-issues.component';

describe('DashboardAssignedIssuesComponent', () => {
  let component: DashboardAssignedIssuesComponent;
  let fixture: ComponentFixture<DashboardAssignedIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAssignedIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAssignedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
