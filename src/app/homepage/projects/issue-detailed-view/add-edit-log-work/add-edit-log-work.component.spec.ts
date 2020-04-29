import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLogWorkComponent } from './add-edit-log-work.component';

describe('AddEditLogWorkComponent', () => {
  let component: AddEditLogWorkComponent;
  let fixture: ComponentFixture<AddEditLogWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLogWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLogWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
