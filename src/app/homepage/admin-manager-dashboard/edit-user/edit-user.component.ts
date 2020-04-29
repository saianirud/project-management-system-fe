import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin/admin.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as AdminActions from 'src/app/homepage/admin-manager-dashboard/store/admin.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  public user: User;
  public roles = [];
  public userRole;

  public adminSubcription: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private adminService: AdminService,
    private dialogRef: MatDialogRef<EditUserComponent>, private store: Store<fromApp.AppState>,
    private toastr: CustomToastrService) { }

  ngOnInit(): void {

    this.adminSubcription = this.store.select('admin').subscribe(
      res => {
        this.user = res.users[this.data.index];
        this.userRole = this.user.role;
      }
    );

    this.roles = this.adminService.getRoles();
  }

  updateUser() {
    const payload = {
      name: this.user.name,
      role: this.userRole
    }

    this.adminService.updateUser(this.user.username, payload).subscribe(
      (res: any) => {
        const payload = {
          username: res.username,
          name: res.name,
          role: res.role,
          token: res.token
        };
        this.store.dispatch(new AdminActions.UpdateUser({ index: this.data.index, user: payload }));
        this.toastr.showSuccess('User updated successfully!');
        this.closeDialog();
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.adminSubcription.unsubscribe();
  }

}
