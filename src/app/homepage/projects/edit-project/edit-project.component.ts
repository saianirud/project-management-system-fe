import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as ProjectActions from '../store/project.actions';
import { ProjectService } from 'src/app/service/project/project.service';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  public users = [];

  public editProjectForm = this.formBuilder.group({
    projectName: this.formBuilder.control('', [Validators.required]),
    projectDescription: this.formBuilder.control(''),
    projectKey: this.formBuilder.control('', [Validators.required]),
    projectLead: this.formBuilder.control('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private projectService: ProjectService,
    private dialog: MatDialogRef<EditProjectComponent>, private store: Store<fromApp.AppState>, private toastr: CustomToastrService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

    this.store.select('project').subscribe(
      res => {
        const project = res.projects[this.data.index];
        this.editProjectForm.patchValue(project);
        this.editProjectForm.controls.projectLead.patchValue(project.projectLead.username);
      }
    );

    this.userService.getAllAdminsManagers().subscribe(
      (res: any) => {
        this.users = res;
      }
    );
  }

  closeDialog() {
    this.dialog.close();
  }

  updateProject() {
    this.projectService.updateProject(this.editProjectForm.value.projectKey, this.editProjectForm.value).subscribe(
      (res: any) => {
        this.toastr.showSuccess('Project updated successfully!');
        this.store.dispatch(new ProjectActions.UpdateProject({ project: res, index: this.data.index }));
        this.dialog.close();
      }
    );
  }

}
