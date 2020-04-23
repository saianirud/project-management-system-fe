import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import * as IssueActions from 'src/app/homepage/projects/store/issue.actions';
import { Subscription } from 'rxjs';
import { DialogContainerService } from 'src/app/service/dialog-container/dialog-container.service';
import { IssueDetailedViewComponent } from '../../projects/issue-detailed-view/issue-detailed-view.component';

@Component({
  selector: 'app-assigned-issues',
  templateUrl: './assigned-issues.component.html',
  styleUrls: ['./assigned-issues.component.scss']
})
export class AssignedIssuesComponent implements OnInit, OnDestroy {

  public username;
  public searchText = '';
  public assignedIssues = [];
  public issueSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private dashboardService: DashboardService,
    private dialog: DialogContainerService) { }

  ngOnInit(): void {

    this.store.select('auth').subscribe(
      res => {
        if (res.user) {
          this.username = res.user.username;
          this.getAssignedIssues();
        }
      }
    );

    this.issueSubscription = this.store.select('issue').subscribe(
      res => {
        this.assignedIssues = res.issues;
      }
    );
  }

  getAssignedIssues() {

    const payload = {
      username: this.username
    }

    this.dashboardService.getDashboardAssignedIssues(payload).subscribe(
      (res: any) => {
        this.store.dispatch(new IssueActions.InitializeIssues(res));
      }
    );
  }

  openIssueDetailedView(index, id, projectKey) {
    this.dialog.openDialog(IssueDetailedViewComponent, {
      originalIndex: index,
      issueId: id,
      projectKey: projectKey
    });
  }

  ngOnDestroy() {
    this.issueSubscription.unsubscribe();
    this.store.dispatch(new IssueActions.ClearIssues());
  }

}
