import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import * as AdminActions from 'src/app/homepage/admin-manager-dashboard/store/admin.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogContainerService } from 'src/app/service/dialog-container/dialog-container.service';
import { UserService } from 'src/app/service/user/user.service';
import { SharedDashboardComponent } from 'src/app/shared/shared-dashboard/shared-dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AdminService } from 'src/app/service/admin/admin.service';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-manager-dashboard',
  templateUrl: './admin-manager-dashboard.component.html',
  styleUrls: ['./admin-manager-dashboard.component.scss']
})
export class AdminManagerDashboardComponent implements OnInit, OnDestroy {

  public username: String = '';
  public authSubscription: Subscription;
  public adminSubcription: Subscription;
  public isAdmin: boolean;
  public users = [];

  constructor(private userService: UserService, private store: Store<fromApp.AppState>, private router: Router,
    private dialog: DialogContainerService, private adminService: AdminService, private toastr: CustomToastrService) { }

  ngOnInit(): void {

    this.authSubscription = this.store.select('auth').subscribe(
      res => {
        if (res.user) {
          if (!this.userService.isAdminOrManager(res.user.role)) {
            this.router.navigateByUrl('/homepage');
          }
          this.username = res.user.username;
          this.isAdmin = this.userService.isAdmin(res.user.role);
        }
      }
    );

    this.adminSubcription = this.store.select('admin').subscribe(
      res => {
        this.users = res.users;
      }
    );

    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.store.dispatch(new AdminActions.InitializeUsers(res));
      }
    );
  }

  openUserDashboard(username) {
    this.dialog.openDialog(SharedDashboardComponent, {
      username: username
    }, '95%', '99%');
  }

  editUser(index) {
    this.dialog.openDialog(EditUserComponent, {
      index: index
    }, '30%', '30%');
  }

  deleteUser(index, username) {
    const dialogRef = this.dialog.openDialog(ConfirmationDialogComponent, null, '20%', '30%');
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.adminService.deleteUser(username).subscribe(
            (res: any) => {
              this.store.dispatch(new AdminActions.DeleteUser(index));
              this.toastr.showSuccess(res.username + ' deleted successfully!');
            }
          );
        }
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.adminSubcription.unsubscribe();
  }

}
