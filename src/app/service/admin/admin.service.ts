import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = environment.server + '/admin';
  private usersUrl = this.adminUrl + '/users';

  private roles = ["ADMIN", "MANAGER", "EMPLOYEE"];

  constructor(private http: HttpClient) { }

  updateUser(username, data) {
    return this.http.put(this.usersUrl + '/' + username, data);
  }

  deleteUser(username) {
    return this.http.delete(this.usersUrl + '/' + username);
  }

  getRoles() {
    return this.roles;
  }
}
