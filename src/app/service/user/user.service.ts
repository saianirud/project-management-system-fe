import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.server + '/users';
  private getUserByTokenUrl = this.usersUrl + '/token';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.usersUrl);
  }

  getUserByToken(token) {
    return this.http.get(this.getUserByTokenUrl + '/' + token);
  }
}
