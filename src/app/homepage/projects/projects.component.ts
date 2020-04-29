import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogContainerService } from 'src/app/service/dialog-container/dialog-container.service';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from 'src/app/service/project/project.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as ProjectActions from './store/project.actions';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  public projects = [];
  public searchText = '';
  public projectSubscription: Subscription;
  public authSubscription: Subscription;
  public isAdminOrManager: boolean;

  constructor(private dialog: DialogContainerService, private projectService: ProjectService, private router: Router,
    private store: Store<fromApp.AppState>, private userService: UserService) { }

  ngOnInit(): void {

    this.authSubscription = this.store.select('auth').subscribe(
      res => {
        if (res.user) {
          this.isAdminOrManager = this.userService.isAdminOrManager(res.user.role);
        }
      }
    );

    this.projectSubscription = this.store.select('project').subscribe(
      res => {
        this.projects = res.projects;
      }
    );

    this.projectService.getAllProjects().subscribe(
      (res: any) => {
        this.store.dispatch(new ProjectActions.InitializeProjects(res));
      }
    );
  }

  addProject() {
    this.dialog.openDialog(AddProjectComponent);
  }

  openProjectDetails(projectKey) {
    this.router.navigateByUrl("/homepage/projects/" + projectKey);
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
