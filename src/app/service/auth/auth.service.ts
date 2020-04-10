import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private securityQuestionsUrl = environment.server + '/auth' + '/securityQuestions';

  constructor(private http: HttpClient) { }

  getSecurityQuestions() {
    return this.http.get(this.securityQuestionsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
