import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select'
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from '../app-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProjectDetailViewComponent } from './projects/project-detail-view/project-detail-view.component';
import { AddTaskComponent } from './projects/add-task/add-task.component';
import { IssueDetailedViewComponent } from './projects/issue-detailed-view/issue-detailed-view.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddEditLogWorkComponent } from './projects/issue-detailed-view/add-edit-log-work/add-edit-log-work.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminManagerDashboardComponent } from './admin-manager-dashboard/admin-manager-dashboard.component';
import { EditUserComponent } from './admin-manager-dashboard/edit-user/edit-user.component';
import { LinkIssuesComponent } from './projects/issue-detailed-view/link-issues/link-issues.component';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    declarations: [
        HomepageComponent,
        DashboardComponent,
        ProjectsComponent,
        AddProjectComponent,
        ProjectDetailViewComponent,
        AddTaskComponent,
        IssueDetailedViewComponent,
        EditProjectComponent,
        AddEditLogWorkComponent,
        AdminManagerDashboardComponent,
        EditUserComponent,
        LinkIssuesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        FlexLayoutModule,
        MatTabsModule,
        HttpClientModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        MatIconModule,
        NgxChartsModule,
        MatSelectModule,
        ReactiveFormsModule,
        DragDropModule,
        MatTooltipModule,
        Ng2SearchPipeModule,
        AppRoutingModule,
        MatProgressBarModule,
        SharedModule
    ],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }

    ]
})
export class HomePageModule { }