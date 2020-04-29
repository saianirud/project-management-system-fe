import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { IssueService } from 'src/app/service/issue/issue.service';
import { UserService } from 'src/app/service/user/user.service';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as IssueActions from '../store/issue.actions';
import * as WorklogActions from '../store/worklogs.actions';
import { DialogContainerService } from 'src/app/service/dialog-container/dialog-container.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';
import { RegexService } from 'src/app/service/regex/regex.service';
import { AddEditLogWorkComponent } from './add-edit-log-work/add-edit-log-work.component';
import { WorklogService } from 'src/app/service/worklog/worklog.service';
import { Subscription } from 'rxjs';
import { UnitsConversionService } from 'src/app/service/units-conversion/units-conversion.service';
import { Issue } from 'src/app/models/issue.model';
import { User } from 'src/app/models/user.model';
import { LinkIssuesComponent } from './link-issues/link-issues.component';

@Component({
  selector: 'app-issue-detailed-view',
  templateUrl: './issue-detailed-view.component.html',
  styleUrls: ['./issue-detailed-view.component.scss']
})
export class IssueDetailedViewComponent implements OnInit, OnDestroy {

  public issue;
  public issueTypes = [];
  public issuePriorities = [];
  public users = [];
  public issueCategories = [];
  public editMode: boolean;
  public loggedTime = '';
  public workLogs = [];
  public logPercentage = 0;
  public user: User;
  public worklogSubscription: Subscription;
  public issueSubscription: Subscription;
  public authSubscription: Subscription;

  public editIssueForm = this.formBuilder.group({
    issueType: this.formBuilder.control('', [Validators.required]),
    issuePriority: this.formBuilder.control('', [Validators.required]),
    issueCategory: this.formBuilder.control('', [Validators.required]),
    issueSummary: this.formBuilder.control('', [Validators.required]),
    issueDescription: this.formBuilder.control(''),
    issueReporter: this.formBuilder.control('', [Validators.required]),
    issueAssignee: this.formBuilder.control('', [Validators.required]),
    originalEstimate: this.formBuilder.control('', [Validators.pattern(this.regexService.TIME_ESTIMATE_REGEX)]),
    loggedTime: this.formBuilder.control('', [Validators.pattern(this.regexService.TIME_ESTIMATE_REGEX)]),
    projectKey: this.formBuilder.control('', [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<IssueDetailedViewComponent>, private issueService: IssueService,
    private userService: UserService, private store: Store<fromApp.AppState>, private dialog: DialogContainerService,
    private toastr: CustomToastrService, private regexService: RegexService, private worklogService: WorklogService,
    private conversionService: UnitsConversionService) { }

  ngOnInit(): void {

    const issueStore = this.store.select('issue');

    this.worklogSubscription = this.store.select('worklog').subscribe(
      res => {
        this.workLogs = res.worklogs;
      }
    );

    this.authSubscription = this.store.select('auth').subscribe(
      res => {
        this.user = res.user;
      }
    );

    this.issueService.getIssue(this.data.issueId).subscribe(
      (res: any) => {
        const issue = new Issue(res.id, res.issueSummary, res.issueDescription, res.issueType, res.issueCategory, res.issuePriority, res.issueReporter, res.issueAssignee, res.originalEstimate, res.loggedTime, res.linkedIssues);
        this.store.dispatch(new IssueActions.UpdateIssue({ issue: issue, index: this.data.originalIndex }));
        this.store.dispatch(new WorklogActions.InitializeWorklogs(res.workLogs));
      }
    );

    this.issueSubscription = issueStore.subscribe(
      res => {
        if (res.issues.length > 0) {
          this.issue = res.issues[this.data.originalIndex];
          this.editIssueForm.patchValue(this.issue);
          if (this.issue.issueReporter !== undefined && this.issue.issueReporter !== null) {
            this.editIssueForm.controls.issueReporter.patchValue(this.issue.issueReporter.username);
          }
          if (this.issue.issueAssignee !== undefined && this.issue.issueAssignee !== null) {
            this.editIssueForm.controls.issueAssignee.patchValue(this.issue.issueAssignee.username);
          }
          this.editIssueForm.controls.projectKey.patchValue(this.data.projectKey);
          if (this.issue.originalEstimate !== undefined) {
            this.editIssueForm.controls.originalEstimate.patchValue(this.conversionService.convertMillisecondsToEstimatedTime(this.issue.originalEstimate));
          }

          if (this.issue.loggedTime !== undefined) {
            this.loggedTime = this.conversionService.convertMillisecondsToEstimatedTime(this.issue.loggedTime);
            this.editIssueForm.controls.loggedTime.patchValue(this.loggedTime);

            this.logPercentage = (this.issue.loggedTime * 100) / this.issue.originalEstimate;
          }

          if (this.issue.issueType !== undefined) {
            this.issueService.getAllIssueTypes().subscribe(
              res => {
                this.issueTypes = res;
                if (res) {
                  const type = this.issueTypes.find(issueType => issueType.id === this.issue.issueType.id)
                  this.editIssueForm.controls.issueType.patchValue(type);
                }
              }
            );
          }

          if (this.issue.issuePriority !== undefined) {
            this.issueService.getAllIssuePriorities().subscribe(
              res => {
                this.issuePriorities = res;
                if (res) {
                  const priority = this.issuePriorities.find(issuePriority => issuePriority.id === this.issue.issuePriority.id)
                  this.editIssueForm.controls.issuePriority.patchValue(priority);
                }
              }
            );
          }

          if (this.issue.issueCategory !== undefined) {
            this.issueService.getAllIssueCategories().subscribe(
              res => {
                this.issueCategories = res;
                if (res) {
                  const category = this.issueCategories.find(issueCategory => issueCategory.id === this.issue.issueCategory.id)
                  this.editIssueForm.controls.issueCategory.patchValue(category);
                }
              }
            );
          }
        }
      }
    );

    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res;
      }
    );
  }

  linkIssues() {
    this.dialog.openDialog(LinkIssuesComponent, {
      index: this.data.originalIndex
    }, '40%', '30%');
  }

  unlinkIssues(dependentIssueId, linkIndex) {
    const dialogRef = this.dialog.openDialog(ConfirmationDialogComponent, null, '20%', '30%');
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          const linkedIssues = [];
          linkedIssues.push(dependentIssueId);
          const payload = {
            issueId: this.issue.id,
            linkedIssues: linkedIssues
          }
          this.issueService.unlinkIssue(payload).subscribe(
            (res: any) => {
              const issue: Issue = { ...this.issue };
              const linkedIssues = [...issue.linkedIssues];
              linkedIssues.splice(linkIndex, 1);
              issue.linkedIssues = linkedIssues;
              this.store.dispatch(new IssueActions.UpdateIssue({ index: this.data.originalIndex, issue: issue }));
              this.toastr.showSuccess('Issue detached successfully!');
            }
          );
        }
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteIssue() {
    const dialogRef = this.dialog.openDialog(ConfirmationDialogComponent, null, '20%', '30%');
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.issueService.deleteIssue(this.issue.id).subscribe(
            (res: any) => {
              this.store.dispatch(new IssueActions.DeleteIssue(this.data.originalIndex));
              this.closeDialog();
              this.toastr.showSuccess(res.issueId + ' deleted successfully!');
            }
          );
        }
      }
    );
  }

  updateIssue() {
    this.issueService.updateIssue(this.issue.id, this.editIssueForm.value).subscribe(
      (res: any) => {
        this.store.dispatch(new IssueActions.UpdateIssue({ issue: res, index: this.data.originalIndex }));
        this.editMode = false;
        this.toastr.showSuccess(this.issue.id + ' updated successfully!');
      }
    );
  }

  logWork() {
    this.dialog.openDialog(AddEditLogWorkComponent, {
      originalEstimate: this.editIssueForm.value.originalEstimate,
      issue: this.issue.id,
      issueIndex: this.data.originalIndex
    }, '60%', '30%');
  }

  editWorkLog(index) {
    this.dialog.openDialog(AddEditLogWorkComponent, {
      issue: this.issue.id,
      index: index,
      issueIndex: this.data.originalIndex
    }, '60%', '30%');
  }

  deleteWorkLog(index) {
    const dialogRef = this.dialog.openDialog(ConfirmationDialogComponent, null, '20%', '30%');
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.worklogService.deleteWorkLog(this.workLogs[index].id).subscribe(
            res => {
              const newIssue = { ...this.issue };
              newIssue.loggedTime = newIssue.loggedTime - this.workLogs[index].timeSpent;
              this.store.dispatch(new WorklogActions.DeleteWorklog(index));
              this.store.dispatch(new IssueActions.UpdateIssue({ issue: newIssue, index: this.data.originalIndex }));
              this.toastr.showSuccess('Worklog deleted succesfully!');
            }
          );
        }
      }
    );
  }

  convertToLocalTime(time) {
    return (new Date(time)).toLocaleString();
  }

  showEditDeleteWorklog(index) {
    if (this.userService.isAdmin(this.user.role) || (this.user.username === this.workLogs[index].loggedUser.username)) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.issueSubscription.unsubscribe();
    this.worklogSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.store.dispatch(new WorklogActions.ClearWorklogs());
  }

}
