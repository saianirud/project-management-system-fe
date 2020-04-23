import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import * as moment from 'moment';
import { UnitsConversionService } from 'src/app/service/units-conversion/units-conversion.service';
import { Subscription } from 'rxjs';
import * as WorklogActions from 'src/app/homepage/projects/store/worklogs.actions';
import { DialogContainerService } from 'src/app/service/dialog-container/dialog-container.service';
import { AddEditLogWorkComponent } from '../../projects/issue-detailed-view/add-edit-log-work/add-edit-log-work.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { WorklogService } from 'src/app/service/worklog/worklog.service';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';

@Component({
  selector: 'app-worklogs',
  templateUrl: './worklogs.component.html',
  styleUrls: ['./worklogs.component.scss']
})
export class WorklogsComponent implements OnInit, OnDestroy {

  public username;
  public worklogs = [];
  public startDate: moment.Moment;
  public endDate: moment.Moment;
  public worklogSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private dashboardService: DashboardService,
    public conversionService: UnitsConversionService, private dialog: DialogContainerService,
    private worklogService: WorklogService, private toastr: CustomToastrService) { }

  ngOnInit(): void {

    this.endDate = moment().utc(true).startOf('day');
    this.startDate = moment().utc(true).startOf('day').subtract(7, 'days');

    this.store.select('auth').subscribe(
      res => {
        if (res.user) {
          this.username = res.user.username;
          this.getWorklogs();
        }
      }
    );

    this.worklogSubscription = this.store.select('worklog').subscribe(
      res => {
        this.worklogs = res.worklogs;
      }
    );
  }

  getWorklogs() {

    const payload = {
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
      username: this.username
    }

    this.dashboardService.getDashboardWorklogs(payload).subscribe(
      (res: any) => {
        this.store.dispatch(new WorklogActions.InitializeWorklogs(res));
      }
    );
  }

  editWorkLog(index, issueId) {
    this.dialog.openDialog(AddEditLogWorkComponent, {
      issue: issueId,
      index: index
    }, '60%', '30%');
  }

  deleteWorkLog(index, id) {
    const dialogRef = this.dialog.openDialog(ConfirmationDialogComponent, null, '20%', '30%');
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.worklogService.deleteWorkLog(id).subscribe(
            res => {
              this.store.dispatch(new WorklogActions.DeleteWorklog(index));
              this.toastr.showSuccess('Worklog deleted succesfully!');
            }
          );
        }
      }
    );
  }

  ngOnDestroy() {
    this.worklogSubscription.unsubscribe();
    this.store.dispatch(new WorklogActions.ClearWorklogs());
  }

}
