import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorklogService {

  private workLogUrl = environment.server + '/worklogs'

  constructor(private http: HttpClient) { }

  addWorkLog(data) {
    return this.http.post(this.workLogUrl, data);
  }

  updateWorkLog(id, data) {
    return this.http.put(this.workLogUrl + '/' + id, data);
  }

  deleteWorkLog(id) {
    return this.http.delete(this.workLogUrl + '/' + id);
  }
}
