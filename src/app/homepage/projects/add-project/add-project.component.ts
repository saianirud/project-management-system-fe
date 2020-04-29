import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../store/project.actions';
import { ProjectService } from 'src/app/service/project/project.service';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit, OnDestroy {

  public authSubscription: Subscription;

  public addProjectForm = this.formBuilder.group({
    projectName: this.formBuilder.control('', [Validators.required]),
    projectKey: this.formBuilder.control('', [Validators.required, Validators.maxLength(5)]),
    projectDescription: this.formBuilder.control(''),
    projectLead: this.formBuilder.control('', [Validators.required])
  });

  constructor(private dialogRef: MatDialogRef<AddProjectComponent>, private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>, private projectService: ProjectService,
    private toastr: CustomToastrService) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').subscribe(
      res => {
        this.addProjectForm.controls.projectLead.patchValue(res.user.username);
      }
    );

    this.store.select('project');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addProject() {
    this.projectService.addProject(this.addProjectForm.value).subscribe(
      res => {
        this.toastr.showSuccess('Project added succesfully!');
        this.store.dispatch(new ProjectActions.CreateProject(res));
        this.dialogRef.close();
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
