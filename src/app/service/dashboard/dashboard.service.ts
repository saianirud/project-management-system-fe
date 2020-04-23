import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardUrl = environment.server + '/dashboard';
  private worklogUrl = this.dashboardUrl + '/worklogs';
  private projectsUrl = this.dashboardUrl + '/projects';
  private assignedIssuesUrl = this.dashboardUrl + '/assignedissues';

  constructor(private http: HttpClient) { }

  getDashboardWorklogSummary(data) {
    return this.http.post(this.worklogUrl + '/summary', data);
  }

  getDashboardProjectsSummary(data) {
    return this.http.post(this.projectsUrl + '/summary', data);
  }

  getDashboardAssignedIssues(data) {
    return this.http.post(this.assignedIssuesUrl, data);
  }

  getDashboardWorklogs(data) {
    return this.http.post(this.worklogUrl, data);
  }
}
