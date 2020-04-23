import { Component, OnInit } from '@angular/core';
import { DialogContainerService } from 'src/app/service/dialog-container/dialog-container.service';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from 'src/app/service/project/project.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as ProjectActions from './store/project.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects = [];
  public searchText = '';

  constructor(private dialog: DialogContainerService, private projectService: ProjectService, private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.store.select('project').subscribe(
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

}
