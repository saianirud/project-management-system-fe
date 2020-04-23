import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public username;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.store.select('auth').subscribe(
      res => {
        if (res.user && res.user.username) {
          this.username = res.user.username;
        }
      }
    );
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigateByUrl('/login');
  }

}
