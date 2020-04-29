import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shared-dashboard',
  templateUrl: './shared-dashboard.component.html',
  styleUrls: ['./shared-dashboard.component.scss']
})
export class SharedDashboardComponent implements OnInit {

  @Input() username;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    if (this.username === undefined) {
      this.username = this.data.username;
    }
  }

}
