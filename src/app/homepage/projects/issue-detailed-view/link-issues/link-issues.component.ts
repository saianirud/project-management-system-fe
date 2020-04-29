import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditLogWorkComponent } from '../add-edit-log-work/add-edit-log-work.component';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as IssueActions from '../../store/issue.actions';
import { Subscription } from 'rxjs';
import { IssueService } from 'src/app/service/issue/issue.service';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';
import { Issue } from 'src/app/models/issue.model';

@Component({
  selector: 'app-link-issues',
  templateUrl: './link-issues.component.html',
  styleUrls: ['./link-issues.component.scss']
})
export class LinkIssuesComponent implements OnInit, OnDestroy {

  public linkData = [];
  public selectedValues = [];
  public issues = [];
  public issueSubscription: Subscription;

  constructor(private dialogRef: MatDialogRef<AddEditLogWorkComponent>, @Inject(MAT_DIALOG_DATA) public data,
    private store: Store<fromApp.AppState>, private issueService: IssueService, private toastr: CustomToastrService) { }

  ngOnInit(): void {

    this.issueSubscription = this.store.select('issue').subscribe(
      res => {
        this.issues = res.issues;
        const linkedIssues = this.issues[this.data.index].linkedIssues;
        this.issues.map((issue, index) => {
          if (this.data.index !== index) {
            const linkIndex = linkedIssues.findIndex(x => x.linkedIssuesPK.dependentIssueId === issue.id);
            if (linkIndex === -1) {
              this.linkData.push({ name: issue.id, value: issue.id });
            }
          }
        }
        );
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitLinkIssues() {

    const payload = {
      issueId: this.issues[this.data.index].id,
      linkedIssues: this.selectedValues
    }
    this.issueService.linkIssue(payload).subscribe(
      res => {
        const issue: Issue = { ...this.issues[this.data.index] };
        const linkedIssues = [...issue.linkedIssues, res[0]];
        issue.linkedIssues = linkedIssues;
        this.store.dispatch(new IssueActions.UpdateIssue({ index: this.data.index, issue: issue }));
        this.toastr.showSuccess('Issues linked successfully!');
        this.closeDialog();
      }
    );
  }

  ngOnDestroy() {
    this.issueSubscription.unsubscribe();
  }

}
