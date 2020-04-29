import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagerDashboardComponent } from './admin-manager-dashboard.component';

describe('AdminManagerDashboardComponent', () => {
  let component: AdminManagerDashboardComponent;
  let fixture: ComponentFixture<AdminManagerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
