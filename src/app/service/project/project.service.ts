import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = environment.server + '/projects';

  constructor(private http: HttpClient) { }

  addProject(data): Observable<any> {
    return this.http.post(this.projectsUrl, data);
  }

  getAllProjects() {
    return this.http.get(this.projectsUrl);
  }

  updateProject(id, data) {
    return this.http.put(this.projectsUrl + '/' + id, data);
  }

  deleteProject(id) {
    return this.http.delete(this.projectsUrl + '/' + id);
  }

  getProject(projectKey) {
    return this.http.get(this.projectsUrl + '/' + projectKey);
  }

  getProjectWithFilter(projectKey, data) {
    return this.http.post(this.projectsUrl + '/' + projectKey, data);
  }
}
