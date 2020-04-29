import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDetailedViewComponent } from './issue-detailed-view.component';

describe('IssueDetailedViewComponent', () => {
  let component: IssueDetailedViewComponent;
  let fixture: ComponentFixture<IssueDetailedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueDetailedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
