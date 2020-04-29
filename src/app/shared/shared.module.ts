import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HidePasswordDirective } from './show-hide-password/hide-password.directive';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SharedDashboardComponent } from './shared-dashboard/shared-dashboard.component';
import { DashboardSummaryComponent } from './shared-dashboard/dashboard-summary/dashboard-summary.component';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DashboardAssignedIssuesComponent } from './shared-dashboard/dashboard-assigned-issues/dashboard-assigned-issues.component';
import { DashboardWorklogComponent } from './shared-dashboard/dashboard-worklog/dashboard-worklog.component';
import { MatMultiSelectComponent } from './mat-multi-select/mat-multi-select.component';

@NgModule({
    declarations: [
        HidePasswordDirective,
        SearchFilterComponent,
        ConfirmationDialogComponent,
        SharedDashboardComponent,
        DashboardSummaryComponent,
        DashboardAssignedIssuesComponent,
        DashboardWorklogComponent,
        MatMultiSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        FlexLayoutModule,
        MatListModule,
        MatTabsModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        MatIconModule,
        NgxChartsModule,
        MatSelectModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        MatProgressBarModule
    ],
    exports: [
        HidePasswordDirective,
        SearchFilterComponent,
        SharedDashboardComponent,
        MatMultiSelectComponent
    ]
})
export class SharedModule { }