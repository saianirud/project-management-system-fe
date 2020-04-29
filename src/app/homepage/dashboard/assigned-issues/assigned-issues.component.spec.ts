import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedIssuesComponent } from './assigned-issues.component';

describe('AssignedIssuesComponent', () => {
  let component: AssignedIssuesComponent;
  let fixture: ComponentFixture<AssignedIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
