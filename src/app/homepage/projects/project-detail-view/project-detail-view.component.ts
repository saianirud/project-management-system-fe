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

@Component({
  selector: 'app-project-detail-view',
  templateUrl: './project-detail-view.component.html',
  styleUrls: ['./project-detail-view.component.scss']
})
export class ProjectDetailViewComponent implements OnInit, OnDestroy {

  public currentProject: any;
  public issueCategories = [];
  public issues = {};
  public projectIndex;
  public issueSubscription: Subscription;
  public projectSubscription: Subscription;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private dialog: DialogContainerService,
    private issueService: IssueService, private store: Store<fromApp.AppState>, private toastr: CustomToastrService,
    private router: Router) { }

  ngOnInit(): void {

    const projectKey = this.route.snapshot.paramMap.get('projectKey');

    this.projectSubscription = this.store.select('project').subscribe(
      res => {
        this.projectIndex = res.projects.findIndex(project => project.projectKey === projectKey);
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

    this.projectService.getProject(projectKey).subscribe(
      (res: any) => {
        if (this.projectIndex === -1) {
          this.store.dispatch(new ProjectActions.CreateProject(res));
        }
        this.store.dispatch(new IssueActions.InitializeIssues(res.issues));
      }
    );

    this.issueService.getAllIssueCategories().subscribe(
      res => {
        this.issueCategories = res;
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

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
    this.issueSubscription.unsubscribe();
    this.store.dispatch(new IssueActions.ClearIssues());
  }

}
