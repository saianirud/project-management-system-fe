import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required])
  });

  constructor(public router: Router, private formBuilder: FormBuilder, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('auth');
  }

  loginUser() {

    this.authService.loginUser(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        const payload = {
          username: res.username,
          name: res.name,
          role: res.role,
          token: res.token
        };
        this.store.dispatch(new AuthActions.AuthenticationSuccess(payload));
        this.router.navigateByUrl('/homepage');
      }
    );
  }

}
