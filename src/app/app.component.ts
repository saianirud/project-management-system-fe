import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user/user.service';
import { Router } from '@angular/router';
import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingSpinnerService } from './service/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isLoading = false;

  constructor(private userService: UserService, private router: Router, private store: Store<fromApp.AppState>,
    private spinner: LoadingSpinnerService) { }

  ngOnInit(): void {

    this.spinner.showSpinner.subscribe(
      res => {
        this.isLoading = res;
      }
    );

    const token = localStorage.getItem('token');

    if (token) {
      this.userService.getUserByToken(token)
        .pipe(catchError(err => {
          this.router.navigateByUrl('/login');
          return throwError(err);
        }))
        .subscribe(
          (res: any) => {
            const payload = {
              username: res.username,
              name: res.name,
              role: res.role,
              token: res.token
            };
            this.store.dispatch(new AuthActions.AuthenticationSuccess(payload));
          }
        );
    }
  }
}
