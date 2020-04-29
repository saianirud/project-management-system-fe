import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import * as fromApp from 'src/app/store/app.reducer';
import * as WorklogActions from '../../store/worklogs.actions';
import * as IssueActions from '../../store/issue.actions';
import { Store } from '@ngrx/store';
import { WorklogService } from 'src/app/service/worklog/worklog.service';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';
import { Issue } from 'src/app/models/issue.model';
import { RegexService } from 'src/app/service/regex/regex.service';
import { UnitsConversionService } from 'src/app/service/units-conversion/units-conversion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-log-work',
  templateUrl: './add-edit-log-work.component.html',
  styleUrls: ['./add-edit-log-work.component.scss']
})
export class AddEditLogWorkComponent implements OnInit, OnDestroy {

  public worklogData;
  public worklogId;
  public previousTimeSpent;
  public issue: Issue;
  public logDateTime: Date;
  public issueSubscription: Subscription;
  public authSubscription: Subscription;
  public worklogSubscription: Subscription;

  public workLogForm = this.formBuilder.group({
    timeSpent: this.formBuilder.control('', [Validators.required, Validators.pattern(this.regexService.TIME_ESTIMATE_REGEX)]),
    workDescription: this.formBuilder.control(''),
    logDateTime: this.formBuilder.control('', [Validators.required]),
    loggedUser: this.formBuilder.control('', [Validators.required]),
    issue: this.formBuilder.control('', [Validators.required])
  });

  constructor(private dialogRef: MatDialogRef<AddEditLogWorkComponent>, @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder, private store: Store<fromApp.AppState>, private worklogService: WorklogService,
    private toastr: CustomToastrService, private regexService: RegexService, private conversionService: UnitsConversionService) { }

  ngOnInit(): void {

    this.logDateTime = new Date();

    this.worklogData = this.store.select('worklog');

    if (this.data.issueIndex !== undefined) {
      this.issueSubscription = this.store.select('issue').subscribe(
        res => {
          this.issue = res.issues[this.data.issueIndex];
        }
      );
    }

    this.authSubscription = this.store.select('auth').subscribe(
      res => {
        this.workLogForm.controls.loggedUser.patchValue(res.user.username);
      }
    );

    this.workLogForm.controls.issue.patchValue(this.data.issue);

    if (this.data.index != undefined) {
      this.worklogSubscription = this.worklogData.subscribe(
        res => {
          if (res.worklogs.length > 0) {
            this.worklogId = res.worklogs[this.data.index].id;
            this.previousTimeSpent = res.worklogs[this.data.index].timeSpent;
            this.workLogForm.controls.workDescription.patchValue(res.worklogs[this.data.index].workDescription);
            this.workLogForm.controls.timeSpent.patchValue(this.conversionService.convertMillisecondsToEstimatedTime(res.worklogs[this.data.index].timeSpent));
            this.logDateTime = (new Date(res.worklogs[this.data.index].logDateTime));
            this.workLogForm.controls.logDateTime.patchValue((new Date(res.worklogs[this.data.index].logDateTime)).toISOString());
          }
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitWorkLog() {
    if (this.data.index != undefined) {
      this.worklogService.updateWorkLog(this.worklogId, this.workLogForm.value).subscribe(
        (res: any) => {
          if (this.data.issueIndex !== undefined) {
            const newIssue = { ...this.issue };
            newIssue.loggedTime = newIssue.loggedTime + res.timeSpent - this.previousTimeSpent;
            this.store.dispatch(new IssueActions.UpdateIssue({ issue: newIssue, index: this.data.issueIndex }));
          }
          this.store.dispatch(new WorklogActions.UpdateWorklog({ worklog: res, index: this.data.index }));
          this.toastr.showSuccess('Worklog updated successfully!');
          this.dialogRef.close();
        }
      );
    } else {
      this.worklogService.addWorkLog(this.workLogForm.value).subscribe(
        (res: any) => {
          if (this.data.issueIndex !== undefined) {
            const newIssue = { ...this.issue };
            newIssue.loggedTime = newIssue.loggedTime + res.timeSpent;
            this.store.dispatch(new IssueActions.UpdateIssue({ issue: newIssue, index: this.data.issueIndex }));
          }
          this.store.dispatch(new WorklogActions.CreateWorklog(res));
          this.toastr.showSuccess('Worklog added successfully!');
          this.dialogRef.close();
        }
      );
    }
  }

  onSelectionLogDateTime() {
    this.workLogForm.controls.logDateTime.patchValue(this.logDateTime.toISOString());
    console.log(this.workLogForm.value.logDateTime);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    if (this.issueSubscription) {
      this.issueSubscription.unsubscribe();
    }
    if (this.worklogSubscription) {
      this.worklogSubscription.unsubscribe();
    }
  }

}
