import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDashboardComponent } from './shared-dashboard.component';

describe('SharedDashboardComponent', () => {
  let component: SharedDashboardComponent;
  let fixture: ComponentFixture<SharedDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
