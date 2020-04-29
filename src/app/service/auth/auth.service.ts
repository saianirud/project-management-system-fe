import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private securityQuestionsUrl = environment.server + '/auth' + '/securityQuestions';
  private loginUserUrl = environment.server + '/auth' + '/login';
  private registerUserUrl = environment.server + '/auth' + '/signup';
  private forgotPasswordUrl = environment.server + '/auth' + '/forgotPassword';
  private resetPasswordUrl = environment.server + '/auth' + '/resetPassword';
  public securityQuestions = [];

  constructor(private http: HttpClient) { }

  getSecurityQuestions() {
    return this.http.get(this.securityQuestionsUrl);
  }

  registerUser(data) {
    return this.http.post(this.registerUserUrl, data);
  }

  loginUser(data) {
    return this.http.post(this.loginUserUrl, data);
  }

  forgotPassword(data) {
    return this.http.post(this.forgotPasswordUrl, data);
  }

  resetPasswordVerifyToken(token) {
    return this.http.get(this.resetPasswordUrl + '/' + token);
  }

  resetPassword(data) {
    return this.http.post(this.resetPasswordUrl, data);
  }
}
