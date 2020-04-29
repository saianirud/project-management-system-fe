import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { DashboardComponent } from './homepage/dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './guard/auth.guard';
import { AutoLoginGuard } from './guard/auto-login.guard';
import { ProjectsComponent } from './homepage/projects/projects.component';
import { ProjectDetailViewComponent } from './homepage/projects/project-detail-view/project-detail-view.component';
import { AdminManagerDashboardComponent } from './homepage/admin-manager-dashboard/admin-manager-dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AutoLoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AutoLoginGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AutoLoginGuard] },
  { path: 'reset-password/:passwordResetToken', component: ResetPasswordComponent },
  {
    path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard],
    children: [
      { path: 'admin/dashboard', component: AdminManagerDashboardComponent },
      { path: 'manager/dashboard', component: AdminManagerDashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/:projectKey', component: ProjectDetailViewComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
