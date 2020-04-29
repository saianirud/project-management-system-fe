import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  public username;
  public isAdminOrManager: boolean;
  public isAdmin: boolean;
  public authSubscription: Subscription;

  constructor(private router: Router, private store: Store<fromApp.AppState>, private userService: UserService) { }

  ngOnInit(): void {

    this.authSubscription = this.store.select('auth').subscribe(
      res => {
        if (res.user && res.user.username) {
          this.username = res.user.username;
          this.isAdminOrManager = this.userService.isAdminOrManager(res.user.role);
          this.isAdmin = this.userService.isAdmin(res.user.role);
        }
      }
    );
  }

  logout() {
    localStorage.clear();
    this.authSubscription.unsubscribe();
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
