import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public username;
  public authSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.authSubscription = this.store.select('auth').subscribe(
      res => {
        if (res.user) {
          this.username = res.user.username;
        }
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
