import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project/project.service';
import { DialogContainerService } from 'src/app/service/dialog-container/dialog-container.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { IssueService } from 'src/app/service/issue/issue.service';
import { IssueDetailedViewComponent } from '../issue-detailed-view/issue-detailed-view.component';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../store/project.actions';
import * as IssueActions from '../store/issue.actions';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';
import { Subscription } from 'rxjs';
import { UnitsConversionService } from 'src/app/service/units-conversion/units-conversion.service';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-project-detail-view',
  templateUrl: './project-detail-view.component.html',
  styleUrls: ['./project-detail-view.component.scss']
})
export class ProjectDetailViewComponent implements OnInit, OnDestroy {

  public currentProject: any;
  public issueCategories = [];
  public searchText = '';
  public issues = {};
  public projectIndex;
  public users = [];
  public selectedUsers = [];
  public user: User;
  public projectKey;
  public issueSubscription: Subscription;
  public projectSubscription: Subscription;
  public authSubscription: Subscription;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private dialog: DialogContainerService,
    private issueService: IssueService, private store: Store<fromApp.AppState>, private toastr: CustomToastrService,
    private router: Router, private conversionService: UnitsConversionService, private userService: UserService) { }

  ngOnInit(): void {

    this.projectKey = this.route.snapshot.paramMap.get('projectKey');

    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res.map(user => {
          return {
            name: user.name ? user.name : user.username,
            value: user.username
          }
        });
        this.selectedUsers = this.users.map(x => x.value);
        this.getProject();
      }
    );

    this.authSubscription = this.store.select('auth').subscribe(
      res => {
        if (res.user) {
          this.user = res.user;
        }
      }
    );

    this.projectSubscription = this.store.select('project').subscribe(
      res => {
        this.projectIndex = res.projects.findIndex(project => project.projectKey === this.projectKey);
        if (this.projectIndex != -1) {
          this.currentProject = res.projects[this.projectIndex];
        }
      }
    );

    this.issueSubscription = this.store.select('issue').subscribe(
      res => {
        this.issues = {};
        res.issues.forEach(
          (res, index) => {
            if (this.issues[res.issueCategory.id] === undefined) {
              this.issues[res.issueCategory.id] = [];
            }
            this.issues[res.issueCategory.id].push({ issue: res, originalIndex: index });
          }
        );
      }
    );

    this.issueService.getAllIssueCategories().subscribe(
      res => {
        this.issueCategories = res;
      }
    );
  }

  getProject() {

    let modifiedUsers = [...this.selectedUsers];

    if (modifiedUsers.length === 0) {
      modifiedUsers = this.users.map(x => x.value);
    }

    const payload = {
      assignees: modifiedUsers
    }
    this.projectService.getProjectWithFilter(this.projectKey, payload).subscribe(
      (res: any) => {
        if (this.projectIndex === -1) {
          this.store.dispatch(new ProjectActions.CreateProject(res));
        }
        this.store.dispatch(new IssueActions.InitializeIssues(res.issues));
      }
    );
  }

  addIssue() {
    this.dialog.openDialog(AddTaskComponent, {
      projectKey: this.currentProject.projectKey
    });
  }

  updateProject() {
    this.dialog.openDialog(EditProjectComponent, {
      index: this.projectIndex
    });
  }

  deleteProject() {
    const dialogRef = this.dialog.openDialog(ConfirmationDialogComponent, null, '20%', '30%');
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.projectService.deleteProject(this.currentProject.projectKey).subscribe(
            (res: any) => {
              this.router.navigateByUrl('/homepage/projects');
              this.toastr.showSuccess(res.projectKey + ' deleted successfully!');
            }
          );
        }
      }
    );
  }

  openIssueDetailedView(index, id) {
    this.dialog.openDialog(IssueDetailedViewComponent, {
      originalIndex: index,
      issueId: id,
      projectKey: this.currentProject.projectKey
    });
  }

  dragDropUpdateIssue(event) {
    if (event.previousContainer !== event.container) {
      const issue = { ...event.previousContainer.data[event.previousIndex].issue };
      issue.issueCategory = this.issueCategories[event.container.id];
      issue.issueReporter = issue.issueReporter.username;
      issue.issueAssignee = issue.issueAssignee.username;
      issue.originalEstimate = this.conversionService.convertMillisecondsToEstimatedTime(issue.originalEstimate);
      issue.loggedTime = this.conversionService.convertMillisecondsToEstimatedTime(issue.loggedTime);
      issue.projectKey = this.currentProject.projectKey;
      this.issueService.updateIssue(issue.id, issue).subscribe(
        (res: any) => {
          this.store.dispatch(new IssueActions.UpdateIssue({ issue: res, index: event.previousContainer.data[event.previousIndex].originalIndex }));
        }
      );
    }
  }

  showEditDeleteProject() {
    if (this.user) {
      if (this.userService.isAdmin(this.user.role) || (this.user.username === this.currentProject.projectLead.username)) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
    this.issueSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.store.dispatch(new IssueActions.ClearIssues());
  }

}
