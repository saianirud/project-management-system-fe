import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { UnitsConversionService } from 'src/app/service/units-conversion/units-conversion.service';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.scss']
})
export class DashboardSummaryComponent implements OnInit {

  @Input() username;

  public startDate: moment.Moment;
  public endDate: moment.Moment;
  public worklogResult = [];
  public projectsResult = [];
  public eachProjectResult = [];
  public projectsObject: any = {};
  public projectLabel = '';
  public authSubscription: Subscription;

  public projectsView = [300, 200];
  public projectsAdvancedView = [600, 200];
  public worklogView = [1100, 350];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public showYAxisLabel = true;
  public showLabels = true;
  public isDoughnut = false;
  public legendPosition = 'below';

  constructor(private dashboardService: DashboardService, private conversionService: UnitsConversionService, ) { }

  ngOnInit(): void {

    this.endDate = moment().utc(true).endOf('day');
    this.startDate = moment().utc(true).startOf('day').subtract(7, 'days');

    this.searchWorklog();
    this.getProjectsSummary();
  }

  searchWorklog() {

    const payload = {
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
      username: this.username
    }

    this.dashboardService.getDashboardWorklogSummary(payload).subscribe(
      (res: any) => {
        this.worklogResult = [];
        const series = res.map(result => {
          return {
            name: result[0],
            value: this.conversionService.getHoursFromMilliseconds(result[1])
          }
        });
        this.worklogResult.push({ name: 'Worklog', series: series });
      }
    );
  }

  getProjectsSummary() {

    const payload = {
      username: this.username
    }

    this.dashboardService.getDashboardProjectsSummary(payload).subscribe(
      (res: any) => {
        res.map(result => {
          const project = result[0];
          if (this.projectsObject[project] === undefined) {
            this.projectsObject[project] = [];
          }
          this.projectsObject[project].push({ name: result[1], value: result[2] });

          const index = this.projectsResult.findIndex(each => each.name === project);
          if (index === -1 || index === undefined) {
            this.projectsResult.push({ name: project, value: result[2] });
          } else {
            this.projectsResult[index].value = this.projectsResult[index].value + result[2];
          }
        });
        this.onProjectSelection(Object.keys(this.projectsObject)[0]);
      }
    );
  }

  onProjectSelection(projectName) {
    this.projectLabel = projectName;
    this.eachProjectResult = this.projectsObject[projectName];
  }

}
