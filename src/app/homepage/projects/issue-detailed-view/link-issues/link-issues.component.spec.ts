import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkIssuesComponent } from './link-issues.component';

describe('LinkIssuesComponent', () => {
  let component: LinkIssuesComponent;
  let fixture: ComponentFixture<LinkIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
