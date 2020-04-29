import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { IssueService } from 'src/app/service/issue/issue.service';
import { UserService } from 'src/app/service/user/user.service';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as IssueActions from '../store/issue.actions';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {

  public issueTypes = [];
  public issuePriorities = [];
  public users = [];

  public authSubscription: Subscription;

  public addIssueForm = this.formBuilder.group({
    issueType: this.formBuilder.control('', [Validators.required]),
    issuePriority: this.formBuilder.control('', [Validators.required]),
    issueSummary: this.formBuilder.control('', [Validators.required]),
    issueDescription: this.formBuilder.control(''),
    issueReporter: this.formBuilder.control('', [Validators.required]),
    issueAssignee: this.formBuilder.control('', [Validators.required]),
    projectKey: this.formBuilder.control('', [Validators.required])
  });

  constructor(private dialogRef: MatDialogRef<AddTaskComponent>, private formBuilder: FormBuilder,
    private issueService: IssueService, private userService: UserService, private store: Store<fromApp.AppState>,
    @Inject(MAT_DIALOG_DATA) public data, private toastr: CustomToastrService) { }

  ngOnInit(): void {

    this.store.select('issue');

    this.issueService.getAllIssueTypes().subscribe(
      res => {
        this.issueTypes = res;
        if (res) {
          this.addIssueForm.controls.issueType.patchValue(this.issueTypes[0]);
        }
      }
    );

    this.issueService.getAllIssuePriorities().subscribe(
      res => {
        this.issuePriorities = res;
        if (res) {
          this.addIssueForm.controls.issuePriority.patchValue(this.issuePriorities[0]);
        }
      }
    );

    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res;
      }
    );

    this.authSubscription = this.store.select('auth').subscribe(
      res => {
        this.addIssueForm.controls.issueReporter.patchValue(res.user.username);
        this.addIssueForm.controls.issueAssignee.patchValue(res.user.username);
      }
    );

    this.addIssueForm.controls.projectKey.patchValue(this.data.projectKey);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addTask() {
    this.issueService.addIssue(this.addIssueForm.value).subscribe(
      (res: any) => {
        this.store.dispatch(new IssueActions.CreateIssue(res));
        this.dialogRef.close();
        this.toastr.showSuccess('Issue added successfully!');
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
