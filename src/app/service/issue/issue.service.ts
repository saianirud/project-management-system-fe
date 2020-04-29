import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IssueService {

  private issueTypes = [];
  public issueTypesSub = new BehaviorSubject(null);

  private issuePriorities = [];
  public issuePrioritiesSub = new BehaviorSubject(null);

  private issueCategories = [];
  public issueCategoriesSub = new BehaviorSubject(null);

  private issuesUrl = environment.server + '/issues';
  private issueTypesUrl = this.issuesUrl + '/types';
  private issuePrioritiesUrl = this.issuesUrl + '/priorities';
  private issueCategoriesUrl = this.issuesUrl + '/categories';

  constructor(private http: HttpClient) { }

  getAllIssueTypes(): BehaviorSubject<any> {

    if (this.issueTypes.length > 0) {
      this.issueTypesSub.next(this.issueTypes);
    } else {
      this.http.get(this.issueTypesUrl).subscribe(
        (res: any) => {
          this.issueTypes = res;
          this.issueTypesSub.next(this.issueTypes);
        }
      );
    }
    return this.issueTypesSub;
  }

  getAllIssuePriorities(): BehaviorSubject<any> {

    if (this.issuePriorities.length > 0) {
      this.issuePrioritiesSub.next(this.issuePriorities);
    } else {
      this.http.get(this.issuePrioritiesUrl).subscribe(
        (res: any) => {
          this.issuePriorities = res;
          this.issuePrioritiesSub.next(this.issuePriorities);
        }
      );
    }
    return this.issuePrioritiesSub;
  }

  getAllIssueCategories(): BehaviorSubject<any> {

    if (this.issueCategories.length > 0) {
      this.issueCategoriesSub.next(this.issueCategories);
    } else {
      this.http.get(this.issueCategoriesUrl).subscribe(
        (res: any) => {
          this.issueCategories = res;
          this.issueCategoriesSub.next(this.issueCategories);
        }
      );
    }
    return this.issueCategoriesSub;
  }

  getIssue(id) {
    return this.http.get(this.issuesUrl + '/' + id);
  }

  addIssue(data) {
    return this.http.post(this.issuesUrl, data);
  }

  updateIssue(issueId, data) {
    return this.http.put(this.issuesUrl + '/' + issueId, data);
  }

  deleteIssue(issueId) {
    return this.http.delete(this.issuesUrl + '/' + issueId);
  }

  linkIssue(data) {
    return this.http.post(this.issuesUrl + '/linkIssues', data);
  }

  unlinkIssue(data) {
    return this.http.post(this.issuesUrl + '/unlinkIssues', data);
  }
}
